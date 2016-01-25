import Phaser from 'phaser';
import NPC from '../objects/NPC';
import Player from '../objects/Player';
import Dialog from '../helpers/Dialog';
import renderer from '../renderer';

const puzzles = [];

export default class PuzzleState extends Phaser.State {

  static add(key) {
    puzzles.push(key);
  }

  init({ key, playerPosition = null }) {
    this.key = key;
    this.activePuzzle = this.game.cache.getJSON(key);
    this.playerPosition = playerPosition;
  }

  create() {
    const { game, activePuzzle: puzzle } = this;

    // Load tilemap
    const map = game.add.tilemap('classroom_map');
    map.addTilesetImage('soulsilver tileset', 'soulsilver tileset');
    map.addTilesetImage('tileset2', 'tileset2');

    // Create background layer
    const backgroundLayer = map.createLayer('Floor+Walls');
    backgroundLayer.resizeWorld();

    // Create prop layers
    [
      'Under Furnitue', // Nouja zeg. ..
      'Desk',
      'Furniture',
      'Outide', // Potverdriedubbeltjes...
      'Window Frames',
      'OnTop'
    ].forEach((layerName) => {
      const layer = map.createLayer(layerName);
    });

    // Create solids
    const solids = this.solids = game.add.group();
    solids.enableBody = true;
    solids.physicsBodyType = Phaser.Physics.ARCADE;

    map.objects.Solids.forEach((object) => {
      let wall = solids.create(object.x, object.y, null);
      wall.body.setSize(object.width, object.height);
      wall.body.immovable = true;
    });

    // Create entities
    this.entities = game.add.group();

    // TODO: make this a separate method in another class, so we can reuse it
    map.objects.Entities.forEach((object) => {
      let entity;
      let position = {
        x: object.x + object.width / 2,
        y: object.y + object.height / 2
      };

      switch (object.type) {
        case 'player':
          // Create player
          if (this.startPlayerPosition) {
            position = {
              x: this.startPlayerPosition.x,
              y: this.startPlayerPosition.y
            };
          }

          entity = this.player = new Player(game, position.x, position.y);
          this.entities.add(this.player);
          break;

        case 'npc':
          // Create NPC
          const npc = entity = new NPC(game, position.x, position.y, object.properties);
          npc.body.immovable = true;
          this.entities.add(npc);
          break;
      }
    });

    let puzzleArea;
    let baskets = [];

    map.objects.Puzzle.forEach((object) => {
      switch (object.type) {
        case 'area':
          puzzleArea = {
            x: object.x + 8,
            y: object.y,
            width: object.width,
            height: object.height
          };
          break;

        case 'gate':
          baskets.push({
            x: object.x,
            y: object.y
          });
          break;

        default:
          break;
      }
    });

    // Load puzzle
    this.nodes = {};
    this.outputs = [];
    this.wires = [];

    const FRAME_RATE = 20;

    Object.keys(puzzle.tiles).forEach((group) => {
      switch (group) {
        case 'inputs':
        case 'outputs':
        case 'sockets':
          Object.keys(puzzle.tiles[group]).forEach((name) => {
            let spriteKey;
            let obj = puzzle.tiles[group][name];
            let { x, y, input, state } = obj;
            x = puzzleArea.x + x * 32;
            y = puzzleArea.y + y * 32;

            let node = {
              name: name,
              group: group,
              input: input !== undefined ? input : null,
              state: state !== undefined ? state : null,
              _done: false
            };

            this.nodes[name] = node;

            switch (group) {
              case 'inputs':
                spriteKey = 'Pump-Right';
                break;

              case 'outputs':
                node.goalState = obj.goalState;
                this.outputs.push(node);
                spriteKey = 'Sink-Left';
                break;

              case 'sockets':
                spriteKey = 'Socket';
                break;
            }

            let sprite = game.add.sprite(x, y, spriteKey);
            node.sprite = sprite;

            switch (group) {
              case 'inputs':
                sprite.animations.add('True', [0, 1, 2, 3], FRAME_RATE);
                sprite.animations.add('False', [4, 5, 6, 7], FRAME_RATE);
                sprite.animations.add('Null');
                break;

              case 'outputs':
                sprite.animations.add('True', [0, 1, 2, 3], FRAME_RATE);
                sprite.animations.add('False', [4, 5, 6, 7], FRAME_RATE);
                sprite.animations.add('Null', [8]);
                break;

              default:
                sprite.animations.add('True');
                sprite.animations.add('False');
                sprite.animations.add('Null');
                break;
            }

            sprite.animations.play('True', null, true);
          });
          break;

        case 'wires':
          puzzle.tiles[group].forEach(({ input, parts }) => {
            let wire = {
              input: input,
              parts: []
            };

            this.wires.push(wire);

            parts.forEach(({ x, y, type }) => {
              x = puzzleArea.x + x * 32;
              y = puzzleArea.y + y * 32;

              let sprite = game.add.sprite(x, y, 'Wire-' + type);
              sprite.animations.add('True', [0, 1, 2, 3], FRAME_RATE);
              sprite.animations.add('False', [4, 5, 6, 7], FRAME_RATE);
              sprite.animations.add('Null', [8]);
              sprite.animations.play('True', null, true);

              wire.parts.push(sprite);
            });
          });
          break;

        default:
          break;
      }
    });

    this.updateNodes();

    // Create dialog
    this.dialog = new Dialog();
    this.dialog.create(game, (state) => { });
  }

  updateNodes() {
    let keys = Object.keys(this.nodes);

    // Mark each node as unready
    keys.forEach((name) => {
      let node = this.nodes[name];
      node._done = false;
    });

    // Update each node
    keys.forEach((name) => {
      this.updateNode(name);
    });

    // Update wires
    this.wires.forEach(({ input, parts }) => {
      let { state } = this.nodes[input];
      let animation = this.getAnimationFromState(state);

      parts.forEach((part) => {
        part.animations.play(animation, null, true);
      });
    });
  }

  updateNode(name) {
    let node = this.nodes[name];

    if (!node._done) {
      if (node.input) {
        let inputStates = node.input.map((input) => {
          return this.updateNode(input).state;
        });

        switch (node.group) {
          case 'outputs':
            node.state = inputStates[0];
            break;

          case 'sockets':
            // TODO: evaluate gates
            node.state = null;
            break;
        }
      }

      // Update animation
      let animation = this.getAnimationFromState(node.state);
      node.sprite.animations.play(animation, null, true);

      node._done = true;
    }

    return node;
  }

  getAnimationFromState(state) {
    switch (state) {
      case true:  return 'True';
      case false: return 'False';
      default:    return 'Null';
    }
  }

  update() {
    const { game, dialog } = this;

    dialog.update();

    game.physics.arcade.collide(this.player, this.solids);
    game.physics.arcade.collide(this.player, this.doors);
    game.physics.arcade.collide(this.player, this.entities);
  }

  render() {
    renderer.render();
  }

}
