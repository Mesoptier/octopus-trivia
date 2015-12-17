import GameState from './states/GameState';

export default class Game extends Phaser.Game {

  constructor() {
    super(500, 500, Phaser.AUTO, 'container', null);
    this.state.add('GameState', GameState, false);
    this.state.start('GameState');
  }

}
