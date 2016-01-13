import Phaser from 'phaser';
import Dialog from '../helpers/Dialog';

require('../assets/fonts/munro/stylesheet.css');

export default class LoadState extends Phaser.State {

  preload() {
    const { game } = this;

    // Load sprites
    game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);

    // Load map
    game.load.tilemap('auditorium_map', require('file!../assets/levels/auditorium.json'), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('soulsilver tileset', require('file!../assets/levels/soulsilver tileset.png'));
    game.load.image('tileset2', require('file!../assets/levels/tileset2.png'));

    // Load dialogs
    game.load.json('dialog-door-closed-1', require('file!../assets/dialogs/door-closed-1.json'));
    Dialog.add('door-closed-1', 'dialog-door-closed-1');
    game.load.json('dialog-door-closed-2', require('file!../assets/dialogs/door-closed-2.json'));
    Dialog.add('door-closed-2', 'dialog-door-closed-2');
    Dialog.addGroup('door-closed', ['door-closed-1', 'door-closed-2']);

    game.load.json('dialog-intro', require('file!../assets/dialogs/intro.json'));
  }

  create() {
    setTimeout(() => {
      this.game.state.start('HubState');
    }, 500);
  }

}
