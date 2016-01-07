import Phaser from 'phaser';
import Player from '../objects/Player';

export default class GameState extends Phaser.State {

  create() {
    const cw = this.game.width / 2;
    const ch = this.game.height / 2;

    this.stage.backgroundColor = '#000000';

    var world = this.game.add.group();
    world.scale.set(2, 2);

    // Create player object
    this.player = new Player(this.game, cw / 2, ch / 2);
    world.add(this.player);
  }

  render() {
    this.game.debug.spriteInfo(this.player, 32, 32);
  }

  // update() {
  //   const speed = 5;
  //
  //   if (this.cursors.left.isDown)
  //     this.text.x -= speed;
  //   if (this.cursors.right.isDown)
  //     this.text.x += speed;
  //
  //   if (this.cursors.up.isDown)
  //     this.text.y -= speed;
  //   if (this.cursors.down.isDown)
  //     this.text.y += speed;
  // }

}
