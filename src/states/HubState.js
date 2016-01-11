import Phaser from 'phaser';
import Player from '../objects/Player';
import renderer from '../renderer';

export default class HubState extends Phaser.State {

  create() {
    const { game } = this;

    const cw = game.width;
    const ch = game.height;

    game.world.setBounds(0, 0, 1024, 1024);
    game.stage.backgroundColor = '#000000';

    this.rootGroup = game.add.group();

    // Create player object
    this.player = new Player(game, cw / 2, ch / 2);
    this.rootGroup.add(this.player);

    // Camera
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);

    // Create walls
    this.wall = game.add.sprite(32, 32, null);
    game.physics.arcade.enable(this.wall);
    this.wall.body.setSize(128, 128, 0, 0);
    this.wall.body.immovable = true;
    this.rootGroup.add(this.wall);
  }

  update() {
    const { game } = this;

    game.physics.arcade.collide(this.player, this.wall);
  }

  render() {
    const { game, rootGroup } = this;

    rootGroup.forEachAlive((sprite) => {
      game.debug.body(sprite);
    });

    renderer.render();
  }

}
