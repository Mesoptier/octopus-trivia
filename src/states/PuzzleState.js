import Phaser from 'phaser';
import Player from '../objects/Player';
import Dialog from '../helpers/Dialog';
import renderer from '../renderer';

export default class PuzzleState extends Phaser.State {

  init(params) {
    this.params = params;
  }

  create() {
    const { game } = this;

    // Create dialog
    this.dialog = new Dialog('small');
    this.dialog.create(game, (state) => {
      // Dialog event handler
    });
  }

  update() {
    this.dialog.update();
  }

  render() {
    renderer.render();
  }

}
