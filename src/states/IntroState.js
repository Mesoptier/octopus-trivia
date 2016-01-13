import Phaser from 'phaser';
import renderer from '../renderer';
import Dialog from '../helpers/Dialog';

export default class IntroState extends Phaser.State {

  create() {
    const { game } = this;

    // Load tilemap
    const map = game.add.tilemap('auditorium_map');
    map.addTilesetImage('soulsilver tileset', 'soulsilver tileset');
    map.addTilesetImage('tileset2', 'tileset2');

    // Create background layer
    const backgroundLayer = map.createLayer('Floor');
    backgroundLayer.resizeWorld();

    // Create prop layers
    [
      'Chairs',
      'Tables',
      'Round tables',
      'PCs',
      'Front Chairs',
      'Others',
      'Upstairs',
      'Stairs',
      'Ballustrade',
      'Cantina',
      'Miscellaneous',
      'Doors'
    ].forEach((layerName) => {
      const layer = map.createLayer(layerName);
    });

    game.camera.x = 960;
    game.camera.y = 420;

    // Create dialog
    this.dialog = new Dialog();
    this.dialog.create(game, (state) => {
      switch (state) {
        case 'stop':
          game.stateTransition.to('BlackState', true, false, 'HubState');
          break;
      }
    });

    this.dialog.play('intro');
  }

  update() {
    this.dialog.update();
  }

  render() {
    renderer.render();
  }

}
