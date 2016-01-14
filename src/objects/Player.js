import Phaser from 'phaser';
import BasePerson from './BasePerson';

export default class Player extends BasePerson {

  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.speed = 120;
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  pause() {
    this.paused = true;
  }

  unpause() {
    this.paused = false;
  }

  update() {
    const { body, cursors, speed } = this;

    body.velocity.set(0, 0);

    if (!this.paused) {
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

      // Limit speed
      if (body.velocity.getMagnitude() > speed * 1.07) {
        body.velocity.setMagnitude(speed * 1.07);
      }
    }

    super.update();
  }

}
