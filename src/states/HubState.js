import Phaser from 'phaser';
import Player from '../objects/Player';
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
    map.objects.Entities.forEach((object) => {
      switch (object.type) {
        case 'player':
          // Create player
          this.player = new Player(game, object.x + object.width / 2, object.y + object.height / 2);
          this.world.add(this.player);
          return;
      }
    });

    // Camera
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

    this.dialog = new Dialog();
    this.dialog.create(game, (state) => {
      switch (state) {
        case 'play':
          this.player.paused = true;
          break;
        case 'stop':
          this.player.paused = false;
          break;
      }
    });

    this.dialog.play('intro-2');
  }

  update() {
    const { game } = this;

    this.dialog.update();

    game.physics.arcade.collide(this.player, this.solids);
    game.physics.arcade.collide(this.player, this.doors, this.collideDoor.bind(this));
  }

  collideDoor(player, door) {
    const open = door.tiledProperties.open == 'true';

    if (open) {
      this.game.stateTransition.to('PuzzleState', true, false, 'param1');
    } else {
      this.dialog.playGroupRandom('door-closed');
    }
  }

  render() {
    renderer.render();
  }

}
