import Phaser from 'phaser';
import renderer from '../renderer';

export default class BlackState {

  init({ nextState, nextParams, duration = 1000, title }) {
    this.nextState = nextState;
    this.nextParams = nextParams;
    this.duration = duration;
    this.title = title;
  }

  create() {
    const { game } = this;

    game.stage.backgroundColor = '#000000';
    this.graphics = game.add.graphics(0, 0);

    const titleText = new Phaser.BitmapText(game, game.width / 2, game.height / 2, 'pixelade', this.title, 26, 'center');
    titleText.anchor.setTo(0.5, 0.5);
    game.world.add(titleText);

    if (this.nextState)
      setTimeout(this.exitState.bind(this), this.duration);
  }

  exitState() {
    // game.stateTransition.to('BlackState', true, false, 'HubState');
    this.game.stateTransition.to(this.nextState, true, false, ...this.nextParams);
  }

  render() {
    this.graphics.beginFill('#000000');
    this.graphics.drawRect(0, 0, this.game.width, this.game.height);
    this.graphics.endFill();

    renderer.render();
  }

}
