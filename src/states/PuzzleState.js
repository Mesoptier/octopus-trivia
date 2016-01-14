import Phaser from 'phaser';
import Player from '../objects/Player';
import Dialog from '../helpers/Dialog';
import renderer from '../renderer';

export default class PuzzleState extends Phaser.State {

  init({ key }) {
    this.key = key;
  }

  create() {
    const { game } = this;

    // Create dialog
    this.dialog = new Dialog('small');
    this.dialog.create(game, (state) => {
      // Dialog event handler
    });

    this.dialog.play(`${this.key}-Dialog`);
  }

  update() {
    this.dialog.update();
  }

  render() {
    renderer.render();
  }

}
