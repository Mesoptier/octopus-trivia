import Phaser from 'phaser';

export default class BasePerson extends Phaser.Sprite {

  constructor(game, x, y, key) {
    super(game, x, y, key, 0);

    this.anchor.set(0.5, 0.5);

    game.physics.arcade.enable(this);
    this.body.setSize(16, 16, 0, 8);

    // Setup animations
    const frameRate = 10;

    this.animations.add('walk_u', [1, 0, 2, 0], frameRate, true);
    this.animations.add('walk_r', [4, 3, 5, 3], frameRate, true);
    this.animations.add('walk_d', [7, 6, 8, 6], frameRate, true);
    this.animations.add('walk_l', [10, 9, 11, 9], frameRate, true);
  }

  update() {
    const angle = this.body.angle * 180 / Math.PI;
    let animation;

    switch (Math.round(angle)) {
      case -90: // Up
        animation = 'walk_u'; break;
      case 0: // Right
        animation = 'walk_r'; break;
      case 90: // Down
        animation = 'walk_d'; break;
      case 180: // Left
        animation = 'walk_l'; break;
    }

    // Start the animation, will be ignored if it is already running
    this.animations.play(animation);

    // Stop animation when standing still
    if (this.body.velocity.getMagnitude() == 0) {
      this.animations.currentAnim.setFrame(1, true);
      this.animations.stop();
    }
  }

}
