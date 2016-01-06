export default class BasePerson extends Phaser.Sprite {

  constructor(game, x, y, key) {
    super(game, x, y, key, 0);

    const frameRate = 10;

    this.animations.add('walk_u', [0, 1, 2], frameRate, true);
    this.animations.add('walk_r', [3, 4, 5], frameRate, true);
    this.animations.add('walk_d', [6, 7, 8], frameRate, true);
    this.animations.add('walk_l', [9, 10, 11], frameRate, true);
  }

}
