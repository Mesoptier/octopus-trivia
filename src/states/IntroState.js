import Phaser from 'phaser';
import renderer from '../renderer';
import Dialog from '../helpers/Dialog';
import BasePerson from '../objects/BasePerson';

export default class IntroState extends Phaser.State {

  create() {
    const { game } = this;

    // Load tilemap
    const map = game.add.tilemap('auditorium_map');
    map.addTilesetImage('soulsilver tileset', 'soulsilver tileset');
    map.addTilesetImage('tileset2', 'tileset2');

    const mapGroup = game.add.group();

    // Create background layer
    const backgroundLayer = map.createLayer('Floor', game.width, game.height, mapGroup);
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
      const layer = map.createLayer(layerName, game.width, game.height, mapGroup);
    });

    // Create entities
    map.objects.IntroEntities.forEach((object) => {
      let entity;

      switch (object.type) {
        case 'player':
          // Player
          entity = game.add.sprite(object.x, object.y, 'player');
          game.camera.follow(entity, Phaser.Camera.FOLLOW_LOCKON);
          break;
        default:
          // Random NPCs
          entity = game.add.sprite(object.x, object.y, object.properties.sprite);
          break;
      }

      if (entity) {
        if (object.properties.facing) {
          entity.frame = BasePerson.getFrameIndex(object.properties.facing);
        }

        entity.anchor.setTo(0.5, 0.5);
        mapGroup.add(entity);
      }
    });

    // Create dialog
    this.dialog = new Dialog();
    this.dialog.create(game, (state) => {
      switch (state) {
        case 'blackout':
          game.add.tween(mapGroup).to({ alpha: 0 }, 500, Phaser.Easing.Exponential.InOut, true);
          break;
        case 'stop':
          game.stateTransition.to('BlackState', true, false, {
            nextState: 'HubState',
            nextParams: [{ startDialog: 'intro-2' }]
          });
          break;
      }
    });

    this.dialog.play('intro-1');
  }

  update() {
    this.dialog.update();
  }

  render() {
    renderer.render();
  }

}
