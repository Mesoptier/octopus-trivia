import Phaser from 'phaser';
import BootState from './states/BootState';

export default class Game extends Phaser.Game {

  constructor() {
    super(384, 288, Phaser.CANVAS, '', null);
    this.state.add('BootState', BootState, true);
  }

}
