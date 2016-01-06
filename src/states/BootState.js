import LoadState from './LoadState';
import GameState from './GameState';

export default class BootState extends Phaser.State {

  create() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.smoothed = false;

    // Add states
    this.state.add('LoadState', LoadState, false);
    this.state.add('GameState', GameState, false);

    this.state.start('LoadState');
  }

}
