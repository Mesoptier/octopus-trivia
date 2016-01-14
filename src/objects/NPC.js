import Phaser from 'phaser';
import BasePerson from './BasePerson';

export default class NPC extends BasePerson {

  constructor(game, x, y, { dialog = '', moveX = 0, moveY = 0, sprite = '' }) {
    super(game, x, y, sprite);

    console.log(sprite, dialog);

    moveX = parseInt(moveX);
    moveY = parseInt(moveY);

    this.paused = false;

    this.speed = 30;
    this.dialog = dialog;
    this.pos1 = new Phaser.Point(x, y);
    this.pos2 = new Phaser.Point(x + moveX, y + moveY);
  }

  update() {
    const { speed, pos1, pos2 } = this;

    if (!this.paused) {
      if (pos1.x < pos2.x) {
        if (pos1.x >= this.x) this.body.velocity.x = +speed;
        if (pos2.x <= this.x) this.body.velocity.x = -speed;
      } else if (pos1.x > pos2.x) {
        if (pos2.x >= this.x) this.body.velocity.x = +speed;
        if (pos1.x <= this.x) this.body.velocity.x = -speed;
      }

      if (pos1.y < pos2.y) {
        if (pos1.y >= this.y) this.body.velocity.y = +speed;
        if (pos2.y <= this.y) this.body.velocity.y = -speed;
      } else if (pos1.y > pos2.y) {
        if (pos2.y >= this.y) this.body.velocity.y = +speed;
        if (pos1.y <= this.y) this.body.velocity.y = -speed;
      }
    } else {
      this.body.velocity.setTo(0, 0);
    }

    super.update();
  }

  pause() {
    this._pauseVelocity = this.body.velocity.clone();
    this.paused = true;
  }

  unpause() {
    this.body.velocity = this._pauseVelocity;
    this.paused = false;
  }

}
