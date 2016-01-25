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
    this.puzzleArea = game.add.group();
    this.puzzleGates = game.add.group();
    this.entities = game.add.group();

    // Add active border for gates
    this.selectBorder = game.add.sprite(0, 0, 'SelectBorder');
    this.selectBorder.anchor.setTo(0.5, 0.5);
    this.selectBorder.visible = false;
    this.selectBorder.animations.add('selected', null, 10);
    this.selectBorder.animations.play('selected', null, true);

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
          this.playerGroup = game.add.group(this.player);
          this.carryingGate = null;
          break;

        case 'npc':
          // Create NPC
          const npc = entity = new NPC(game, position.x, position.y, object.properties);
          npc.body.immovable = true;
          this.entities.add(npc);
          break;
      }
    });

    // Create doors
    const doors = this.doors = game.add.group();
    doors.enableBody = true;
    doors.physicsBodyType = Phaser.Physics.ARCADE;

    map.objects.Doors.forEach((object) => {
      const door = doors.create(object.x + object.width / 2, object.y + object.height / 2, null);
      door.anchor.setTo(0.5, 0.5);
      door.body.setSize(object.width, object.height);
      door.body.immovable = true;
      door.tiledProperties = object.properties;
    });

    let puzzleArea;
    this.gatePlaces = [];

    map.objects.Puzzle.forEach((object) => {
      switch (object.type) {
        case 'area':
          puzzleArea = {
            x: object.x + 8,
            y: object.y
          };
          break;

        case 'gate':
          this.gatePlaces.push({
            type: 'basket',
            x: object.x + object.width / 2,
            y: object.y + object.height / 2 - 5
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
                this.gatePlaces.push({
                  type: 'socket',
                  x: x + 16,
                  y: y + 16,
                  gate: null
                });
                break;
            }

            let sprite = game.add.sprite(x, y, spriteKey);
            node.sprite = sprite;
            this.puzzleArea.add(sprite);

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
              this.puzzleArea.add(sprite);

              wire.parts.push(sprite);
            });
          });
          break;

        default:
          break;
      }
    });

    ['And', 'Or', 'Not', 'Pass', 'Xor'].forEach((gate, index) => {
      let place = this.gatePlaces[index];
      let { x, y } = place;
      let gateType = gate.toLowerCase();
      let count = puzzle.gates[gateType] || 0;
      place.gateType = gateType;
      place.gates = [];

      for (let i = 0; i < count; i++) {
        let sprite = game.add.sprite(x, y - i * 2, 'Gate-' + gate);
        sprite.anchor.setTo(0.5, 0.5);
        this.puzzleGates.add(sprite);
        place.gates.push(sprite);
        sprite.gateType = gateType;
      }
    });

    this.updateNodes();

    // Create dialog
    this.dialog = new Dialog();
    this.dialog.create(game, (state) => { });

    // Add input callbacks
    const spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(this.handleSpaceDown, this);
  }

  handleSpaceDown() {
    if (!this.player.paused) {
      let closestDistance;
      let closest;
      let target;

      // Gates
      target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));
      closestDistance = 16;
      closest = null;

      this.gatePlaces.forEach((place) => {
        let distance = new Phaser.Point(place.x, place.y).distance(target);

        if (closestDistance > distance) {
          closest = place;
          closestDistance = distance;
        }
      });

      if (closest) {
        if (closest.type === 'socket') {
          let swap = closest.gate; // Gate or null
          closest.gate = this.carryingGate;
          this.carryingGate = swap;

          if (closest.gate) {
            closest.gate.position.setTo(closest.x, closest.y);
            this.puzzleGates.add(closest.gate);
          }
        } else if (closest.type === 'basket') {
          let swap;

          if (!this.carryingGate || this.carryingGate.gateType !== closest.gateType) {
            swap = closest.gates.pop();
          }

          if (this.carryingGate) {
            // Find which stack this gate should be placed on
            let targetPlace = this.gatePlaces.reduce((targetPlace, place) => {
              if (targetPlace) return targetPlace;
              if (place.gateType === this.carryingGate.gateType) return place;
            }, null);
            this.carryingGate.position.setTo(targetPlace.x, targetPlace.y - targetPlace.gates.length * 2);
            targetPlace.gates.push(this.carryingGate);
            this.puzzleGates.add(this.carryingGate);
          }
          this.carryingGate = swap;
        }

        if (this.carryingGate) {
          this.carryingGate.x = 0;
          this.carryingGate.y = 0;
          this.playerGroup.add(this.carryingGate);
        }
        return;
      }

      // Entities
      target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));
      closestDistance = 16;
      closest = null;

      this.entities.forEachAlive((entity) => {
        if (entity instanceof NPC) {
          let distance = entity.position.distance(target);

          if (closestDistance > distance) {
            closest = entity;
            closestDistance = distance;
          }
        }
      });

      if (closest && closest.dialog) {
        closest.pause();
        this.dialog.playGroupRandom(closest.dialog, { entity: closest });
        return;
      }

      // Doors
      target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));
      closestDistance = 16;
      closest = null;

      this.doors.forEachAlive((door) => {
        let distance = door.position.distance(target);

        if (closestDistance > distance) {
          closest = door;
          closestDistance = distance;
        }
      });

      if (closest) {
        this.dialog.playGroupRandom('door-closed', {
          x: closest.x,
          y: closest.y - 22
        });

        return;
      }
    }
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
    const { game } = this;

    this.dialog.update();

    game.physics.arcade.collide(this.player, this.solids);
    game.physics.arcade.collide(this.player, this.doors);
    game.physics.arcade.collide(this.player, this.entities);

    this.entities.sort('y', Phaser.Group.SORT_ASCENDING);

    // Show active border around gate drop-off places
    let target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));
    let closestDistance = 16;
    let closest = null;

    this.gatePlaces.forEach((place) => {
      if (place.type === 'socket' && place.gate === null && !this.carryingGate)
        return;

      let distance = new Phaser.Point(place.x, place.y).distance(target);

      if (closestDistance > distance) {
        closest = place;
        closestDistance = distance;
      }
    });

    if (closest) {
      this.selectBorder.visible = true;
      this.selectBorder.position.setTo(closest.x, closest.y);
    } else {
      this.selectBorder.visible = false;
    }
  }

  render() {
    renderer.render();
  }

}
