import Phaser from 'phaser';

require('../assets/fonts/munro/stylesheet.css');

export default class LoadState extends Phaser.State {

  preload() {
    const { game } = this;

    game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);

    game.load.tilemap('auditorium_map', require('file!../assets/levels/auditorium.json'), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('soulsilver tileset', require('file!../assets/levels/soulsilver tileset.png'));
    game.load.image('tileset2', require('file!../assets/levels/tileset2.png'));
  }

  create() {
    setTimeout(() => {
      this.game.state.start('HubState');
    }, 500);
  }

}
