import Phaser from 'phaser';
import Player from '../objects/Player';

export default class PuzzleState extends Phaser.State {

  create() {
    const { game } = this;
  }

  render() {
    this.game.dialog.render();
  }

}
