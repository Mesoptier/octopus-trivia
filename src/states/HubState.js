import Phaser from 'phaser';
import Player from '../objects/Player';
import renderer from '../renderer';

export default class HubState extends Phaser.State {

  create() {
    const { game } = this;

    const cw = game.width;
    const ch = game.height;

    // Load tilemap
    const map = game.add.tilemap('auditorium_map');
    map.addTilesetImage('auditorium', 'auditorium_tiles');

    // Create background layer
    const backgroundLayer = map.createLayer('background');
    backgroundLayer.resizeWorld();

    // Create props layer
    const propsLayer = map.createLayer('props');

    console.log(map);

    const rootGroup = this.rootGroup = game.add.group();

    // Create walls
    const walls = this.walls = game.add.group(rootGroup);
    walls.enableBody = true;
    walls.physicsBodyType = Phaser.Physics.ARCADE;

    map.objects.walls.forEach((object) => {
      let wall = walls.create(object.x, object.y, null);
      wall.body.setSize(object.width, object.height);
      wall.body.immovable = true;
    });

    // Create entities
    map.objects.entities.forEach((object) => {
      switch (object.type) {
        case 'player':
          // Create player
          this.player = new Player(game, object.x + object.width / 2, object.y + object.height / 2);
          rootGroup.add(this.player);
          return;
      }
    })

    // Camera
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
  }

  update() {
    const { game } = this;

    game.physics.arcade.collide(this.player, this.walls);
  }

  render() {
    const { game, rootGroup } = this;

    rootGroup.forEachAlive((sprite) => {
      game.debug.body(sprite);
    });

    renderer.render();
  }

}
