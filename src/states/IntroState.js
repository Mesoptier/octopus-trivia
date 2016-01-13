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

    game.camera.x = 960;
    game.camera.y = 420;

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

    // Create entities
    map.objects.IntroEntities.forEach((object) => {
      const FRAME_LOOK_RIGHT = 3;
      const FRAME_LOOK_LEFT = 0;
      let entity;

      switch (object.type) {
        case 'bloke':
          // Raoul bloke
          break;
        case 'player':
          // Player
          entity = game.add.sprite(object.x, object.y, 'player');
          entity.frame = FRAME_LOOK_RIGHT;
          break;
        default:
          // Random NPCs
          entity = game.add.sprite(object.x, object.y, 'player');
          entity.frame = FRAME_LOOK_RIGHT;
          break;
      }

      if (entity) {
        entity.anchor.setTo(0.5, 0.5);
      }
    });

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