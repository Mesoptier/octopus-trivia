import Phaser from 'phaser';
import renderer from '../renderer';
import LoadState from './LoadState';
import IntroState from './IntroState';
import BlackState from './BlackState';
import HubState from './HubState';
import PuzzleState from './PuzzleState';

require('phaser-state-transition-plugin');

export default class BootState extends Phaser.State {

  preload() {
    this.game.load.image('loading', require('file!../assets/loading.png'));
  }

  init() {
    // Use scaled pixel renderer
    renderer.init(this.game);

    this.game.debug.font = '10px Munro';
    this.game.debug.lineHeight = 12;

    // Start physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // Add states
    this.state.add('LoadState', LoadState, false);
    this.state.add('IntroState', IntroState, false);
    this.state.add('BlackState', BlackState, false);
    this.state.add('HubState', HubState, false);
    this.state.add('PuzzleState', PuzzleState, false);

    this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
    this.game.stateTransition.configure({
      duration: 500,
      ease: Phaser.Easing.Exponential.InOut,
      properties: {
        alpha: 0
      }
    });
  }

  create() {
    this.stage.backgroundColor = '#000000';
    this.loadingText = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'loading');
    this.loadingText.anchor.setTo(0.5, 0.5);

    setTimeout(() => {
      this.state.start('LoadState');
    }, 10);
  }

  render() {
    renderer.render();
  }

}
