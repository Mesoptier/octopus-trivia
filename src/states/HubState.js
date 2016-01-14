import Phaser from 'phaser';
import Player from '../objects/Player';
import NPC from '../objects/NPC';
import renderer from '../renderer';
import Dialog from '../helpers/Dialog';

export default class HubState extends Phaser.State {

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
      const door = doors.create(object.x, object.y, null);
      door.body.setSize(object.width, object.height);
      door.body.immovable = true;
      door.tiledProperties = object.properties;
    });

    // Create entities
    this.entities = game.add.group();

    map.objects.Entities.forEach((object) => {
      switch (object.type) {
        case 'player':
          // Create player
          this.player = new Player(game, object.x + object.width / 2, object.y + object.height / 2);
          this.entities.add(this.player);
          break;

        case 'npc':
          // Create NPC
          const npc = new NPC(game, object.x + object.width / 2, object.y + object.height / 2, object.properties);
          npc.body.immovable = true;
          this.entities.add(npc);
          break;
      }
    });

    // Camera
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

    // Add dialog
    this.dialogEntity = null;

    this.dialog = new Dialog();
    this.dialog.create(game, (state) => {
      switch (state) {
        case 'play':
          this.player.paused = true;
          break;
        case 'stop':
          // Wait a few milliseconds, so a new dialog doesn't instantly start
          setTimeout(() => {
            this.player.paused = false;

            if (this.dialogEntity) {
              this.dialogEntity.unpause();
              this.dialogEntity = null;
            }
          }, 10);
          break;
      }
    });

    this.dialog.play('intro-2');

    // Add input callbacks
    const spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(this.handleSpaceDown, this);
  }

  update() {
    const { game } = this;

    this.dialog.update();

    game.physics.arcade.collide(this.player, this.solids);
    game.physics.arcade.collide(this.player, this.doors, this.collideDoor.bind(this));
    game.physics.arcade.collide(this.player, this.entities);

    this.entities.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  collideDoor(player, door) {
    const open = door.tiledProperties.open == 'true';

    if (open) {
      this.game.stateTransition.to('PuzzleState', true, false, 'param1');
    } else {
      this.dialog.playGroupRandom('door-closed');
    }
  }

  handleSpaceDown() {
    if (!this.player.paused) {
      let closestDistance = 40;
      let closest = null;

      // Prefer NPCs in front of player
      let target = Phaser.Point.add(this.player.position, new Phaser.Point(20, 0).rotate(0, 0, this.player.body.angle));

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
        this.dialog.playGroupRandom(closest.dialog);
        this.dialogEntity = closest;
      }
    }
  }

  render() {
    renderer.render();
  }

}
