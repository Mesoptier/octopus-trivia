import Phaser from 'phaser';

export default class LoadState extends Phaser.State {

  preload() {
    this.game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);
  }

  create() {
    this.game.state.start('GameState');
  }

}
