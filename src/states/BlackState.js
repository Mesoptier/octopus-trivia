import Phaser from 'phaser';
import renderer from '../renderer';

export default class BlackState {

  init(nextState, duration = 1000) {
    this.nextState = nextState;
    this.duration = duration;
  }

  create() {
    this.game.stage.backgroundColor = '#000000';
    this.graphics = this.game.add.graphics(0, 0);

    setTimeout(this.exitState.bind(this), this.duration);
  }

  exitState() {
    // game.stateTransition.to('BlackState', true, false, 'HubState');
    this.game.stateTransition.to(this.nextState);
  }

  render() {
    this.graphics.beginFill('#000000');
    this.graphics.drawRect(0, 0, this.game.width, this.game.height);
    this.graphics.endFill();

    renderer.render();
  }

}
