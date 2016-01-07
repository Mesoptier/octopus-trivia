import Phaser from 'phaser';
import BasePerson from './BasePerson';

export default class Player extends BasePerson {

  constructor(game, x, y) {
    super(game, x, y, 'player');

    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 80;

    this.body.velocity.set(0, 0);

    if (this.cursors.left.isDown)
      this.body.velocity.x -= speed;
    if (this.cursors.right.isDown)
      this.body.velocity.x += speed;

    if (this.cursors.up.isDown)
      this.body.velocity.y -= speed;
    if (this.cursors.down.isDown)
      this.body.velocity.y += speed;

    super.update();
  }

}
