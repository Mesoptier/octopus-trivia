export default class BasePerson extends Phaser.Sprite {

  constructor(game, x, y, key) {
    super(game, x, y, key, 0);

    game.physics.arcade.enable(this);

    this.anchor.set(0.5, 0.5);

    // Setup animations
    const frameRate = 10;

    this.animations.add('walk_u', [0, 1, 0, 2], frameRate, true);
    this.animations.add('walk_r', [3, 4, 3, 5], frameRate, true);
    this.animations.add('walk_d', [6, 7, 6, 8], frameRate, true);
    this.animations.add('walk_l', [9, 10, 9, 11], frameRate, true);
  }

  update() {
    const angle = this.body.angle * 180 / Math.PI;
    let direction;

    switch (angle) {
      case -90: // Up
        this.animations.play('walk_u');
        break;
      case 0: // Right
        this.animations.play('walk_r');
        break;
      case 90: // Down
        this.animations.play('walk_d');
        break;
      case 180: // Left
        this.animations.play('walk_l');
        break;
    }

    // Stop animation when standing still
    if (this.body.velocity.getMagnitude() == 0) {
      this.animations.stop();
    }
  }

}
