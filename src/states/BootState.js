import Phaser from 'phaser';
import renderer from '../renderer';
import LoadState from './LoadState';
import HubState from './HubState';
import PuzzleState from './PuzzleState';

export default class BootState extends Phaser.State {

  init() {
    // Use scaled pixel renderer
    renderer.init(this.game);

    this.game.debug.font = '10px Munro';
    this.game.debug.lineHeight = 12;

    // Start physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // Add states
    this.state.add('LoadState', LoadState, false);
    this.state.add('HubState', HubState, false);
    this.state.add('PuzzleState', PuzzleState, false);
  }

  create() {
    this.state.start('LoadState');
  }

}
