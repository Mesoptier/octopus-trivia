import BootState from './states/BootState';

export default class Game extends Phaser.Game {

  constructor() {
    super(800, 640, Phaser.AUTO, 'container', null);
    this.state.add('BootState', BootState, true);
  }

}
