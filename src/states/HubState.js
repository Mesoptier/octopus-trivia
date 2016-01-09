import Phaser from 'phaser';
import Player from '../objects/Player';
import renderer from '../renderer';

export default class HubState extends Phaser.State {

  create() {
    const cw = this.game.width;
    const ch = this.game.height;

    this.stage.backgroundColor = '#000000';

    var world = this.game.add.group();

    // Create player object
    this.player = new Player(this.game, cw / 2, ch / 2);
    world.add(this.player);
  }

  render() {
    this.game.debug.spriteInfo(this.player, 8, 8);
    renderer.render();
  }

}
