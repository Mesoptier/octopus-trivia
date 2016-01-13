import Phaser from 'phaser';
import Player from '../objects/Player';
import renderer from '../renderer';

export default class PuzzleState extends Phaser.State {

  create() {
    const { game } = this;
  }

  render() {
    this.game.dialog.render();

    renderer.render();
  }

}
