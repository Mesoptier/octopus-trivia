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
    body.velocity.set(0, 0);

    if (cursors.left.isDown) {
      body.velocity.x = -speed;
    }
    if (cursors.right.isDown) {
      body.velocity.x = speed;
    }
    if (cursors.up.isDown) {
      body.velocity.y = -speed;
    }
    if (cursors.down.isDown) {
      body.velocity.y = +speed;
    }

    super.update();
  }

}
