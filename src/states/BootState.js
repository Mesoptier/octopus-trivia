import LoadState from './LoadState';
import GameState from './GameState';

export default class BootState extends Phaser.State {

  create() {
    // this.scale.maxWidth = 800;
    // this.scale.maxHeight = 640;
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.scale.setScreenSize();

    this.stage.smoothed = false;

    // Add states
    this.state.add('LoadState', LoadState, false);
    this.state.add('GameState', GameState, false);

    this.state.start('LoadState');
  }

}
