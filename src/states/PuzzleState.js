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

          if (object.properties.dialogEntityId === 'Teacher') {
            this.teacherEntity = entity;
          }
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

    this.sockets = game.add.group();
    this.sockets.enableBody = true;
    this.sockets.physicsBodyType = Phaser.Physics.ARCADE;

    const FRAME_RATE = 20;

    Object.keys(puzzle.tiles).forEach((group) => {
      switch (group) {
        case 'inputs':
        case 'outputs':
        case 'sockets':
          Object.keys(puzzle.tiles[group]).forEach((name) => {
            let spriteKey;
            let gatePlace;
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

                game.add.image(x, y, 'Goal-' + (obj.goalState ? 'True' : 'False'));

                break;

              case 'sockets':
                spriteKey = 'Socket';
                gatePlace = {
                  type: 'socket',
                  x: x + 16,
                  y: y + 16,
                  gate: null
                };

                let socketSolid = this.sockets.create(x + 3, y + 3, null);
                socketSolid.body.setSize(26, 26);
                socketSolid.body.immovable = true;
                socketSolid.gatePlace = gatePlace;
                break;
            }

            let sprite = game.add.sprite(x, y, spriteKey);
            node.sprite = sprite;
            this.puzzleArea.add(sprite);

            if (gatePlace) {
              this.gatePlaces.push(gatePlace);
              sprite.gatePlace = gatePlace;
            }

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
    this.dialog.create(game, (state, ...params) => {
      switch (state) {
        case 'play':
          this.player.pause();
          break;

        case 'stop':
          if (params[0] === this.activePuzzle.dialogs.outro) {
            if (this.activePuzzle.nextPuzzle) {
              this.game.stateTransition.to('BlackState', true, false, {
                nextState: 'PuzzleState',
                nextParams: [{ key: this.activePuzzle.nextPuzzle, playerPosition: this.playerPosition }],
                title: this.game.cache.getJSON(this.activePuzzle.nextPuzzle).title
              });
            }
            break;
          }

          let entity = this.dialog.activeEntity;
          if (entity && entity.paused) {
            entity.unpause();
          }

          // Wait a few milliseconds, so a new dialog doesn't instantly start
          setTimeout(() => {
            this.player.unpause();
          }, 10);
          break;
      }
    });

    if (this.activePuzzle.dialogs && this.activePuzzle.dialogs.intro) {
      this.player.pause();
      this.teacherEntity.pause();

      this.dialog.play(this.activePuzzle.dialogs.intro, {
        entity: this.teacherEntity,
        align: 'left'
      });
    }

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
            swap = closest.gates.pop() || null;
          } else {
            swap = null;
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

        this.updateNodes();
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

      if (closest === this.teacherEntity && this.activePuzzle.dialogs.hints) {
        this.teacherEntity.pause();

        this.dialog.playGroup(this.activePuzzle.dialogs.hints, {
          entity: this.teacherEntity,
          align: 'left'
        });
      }

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

    // Check output
    this.completed = this.outputs.reduce((completed, output) => {
      return completed && output.state === output.goalState;
    }, true);

    if (this.completed) {
      this.dialog.play(this.activePuzzle.dialogs.outro, {
        entity: this.teacherEntity,
        align: 'left'
      });
    }
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
          node.state = null;

            if (inputStates.indexOf(null) === -1) {
              if (node.sprite.gatePlace && node.sprite.gatePlace.gate) {
                switch(node.sprite.gatePlace.gate.gateType) {
                  case 'and':
                    node.state = inputStates[0] && inputStates[1];
                    break;
                  case 'or':
                    node.state = inputStates[0] || inputStates[1];
                    break;
                  case 'not':
                    node.state = !inputStates[0];
                    break;
                  case 'pass':
                    node.state = inputStates[0];
                    break;
                  case 'xor':
                    node.state = inputStates[0] !== inputStates[1];
                    break;
                  default:
                    break;
                }
              }
            }

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

    this.sockets.forEachAlive((socket) => {
      socket.body.enable = (this.carryingGate !== null) || (socket.gatePlace.gate !== null);
    });

    game.physics.arcade.collide(this.player, this.sockets);

    this.entities.sort('y', Phaser.Group.SORT_ASCENDING);

    if (this.carryingGate) {
      let position = new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle);
      this.carryingGate.position = position;
    }

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
