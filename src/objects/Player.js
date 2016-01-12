import Phaser from 'phaser';
import BasePerson from './BasePerson';

export default class Player extends BasePerson {

  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    const { body, cursors } = this;

    const speed = 160;

    if (cursors.left.isDown) {
      body.velocity.set(-speed, 0);
    } else if (cursors.right.isDown) {
      body.velocity.set(+speed, 0);
    } else if (cursors.up.isDown) {
      body.velocity.set(0, -speed);
    } else if (cursors.down.isDown) {
      body.velocity.set(0, +speed);
    } else {
      body.velocity.set(0, 0);
    }

    super.update();
  }

}
