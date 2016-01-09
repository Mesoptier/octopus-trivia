import Phaser from 'phaser';

require('../assets/fonts/munro/stylesheet.css');

export default class LoadState extends Phaser.State {

  preload() {
    this.game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);
  }

  create() {
    setTimeout(() => {
      this.game.state.start('HubState');
    }, 500);
  }

}
