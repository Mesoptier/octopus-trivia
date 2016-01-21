import Phaser from 'phaser';
import Player from '../objects/Player';
import NPC from '../objects/NPC';
import BasePerson from '../objects/NPC';
import renderer from '../renderer';
import Dialog from '../helpers/Dialog';

export default class HubState extends Phaser.State {

  init({ startDialog = null, playerPosition = null } = {}) {
    this.startDialog = startDialog;
    this.startPlayerPosition = playerPosition;
  }

  create() {
    const { game } = this;

    // Load tilemap
    const map = game.add.tilemap('auditorium_map');
    map.addTilesetImage('soulsilver tileset', 'soulsilver tileset');
    map.addTilesetImage('tileset2', 'tileset2');

    // Create background layer
    const backgroundLayer = map.createLayer('Floor');
    backgroundLayer.resizeWorld();

    // Create prop layers
    [
      'Chairs',
      'Tables',
      'Round tables',
      'PCs',
      'Front Chairs',
      'Others',
      'Upstairs',
      'Stairs',
      'Ballustrade',
      'Cantina',
      'Miscellaneous',
      'Doors'
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

    const doors = this.doors = game.add.group();
    doors.enableBody = true;
    doors.physicsBodyType = Phaser.Physics.ARCADE;

    map.objects.Doors.forEach((object) => {
      const door = doors.create(object.x + object.width / 2, object.y + object.height / 2, null);
      door.anchor.setTo(0.5, 0.5);
      door.body.setSize(object.width, object.height);
      door.body.immovable = true;
      door.tiledProperties = object.properties;

      if (door.tiledProperties.open === 'true') {
        game.add.image(object.x, object.y, 'door-open');
      }
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

      if (entity) {
        if (object.properties.facing) {
          entity.setFacing(object.properties.facing);
        }

        if (this.startDialog && object.properties.startDialog === this.startDialog) {
          this.dialog.play(this.startDialog, { entity });
          entity.pause();
        }
      }
    });

    // Camera
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

    // Add dialog
    this.dialog = new Dialog();
    this.dialog.create(game, (state) => {
      switch (state) {
        case 'play':
          this.player.pause();
          break;
        case 'stop':
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

    if (this.startDialog) {
      // TODO: make this better...
      if (this.startDialog === 'intro-2') {
        // Add background music
        this.music = game.add.audio('hubMusic');
        this.music.play();
      }
    }

    // Add input callbacks
    const spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(this.handleSpaceDown, this);
  }

  update() {
    const { game } = this;

    this.dialog.update();

    game.physics.arcade.collide(this.player, this.solids);
    game.physics.arcade.collide(this.player, this.doors);
    game.physics.arcade.collide(this.player, this.entities);

    this.entities.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  // TODO: maybe move this to Player?
  handleSpaceDown() {
    if (!this.player.paused) {
      let closestDistance;
      let closest;
      let target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));

      // Entities
      closestDistance = 12;
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
        if (closest.tiledProperties.open == 'true') {
          this.game.stateTransition.to('BlackState', true, false, {
            nextState: 'PuzzleState',
            nextParams: [{ key: 'Puzzle-LogicAndSet-1', playerPosition: this.player.position }],
            title: 'Logic & Set\n#1'
          });
        } else {
          this.dialog.playGroupRandom('door-closed', {
            x: closest.x,
            y: closest.y - 22
          });
        }

        return;
      }
    }
  }

  render() {
    renderer.render();
  }

}
