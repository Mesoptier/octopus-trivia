import Phaser from 'phaser';
import Player from '../objects/Player';
import * as renderer from '../renderer';

export default class HubState extends Phaser.State {

  create() {
    const cw = this.game.width;
    const ch = this.game.height;

    this.stage.backgroundColor = '#000000';

    var world = this.game.add.group();
    // world.scale.set(2, 2);

    // Create player object
    this.player = new Player(this.game, cw / 2, ch / 2);
    world.add(this.player);

    var graphics = this.game.add.graphics(32 * 2, 32 * 2);
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.drawRect(50, 250, 32 * 2, 32 * 2);
  }

  render() {
    this.game.debug.spriteInfo(this.player, 32, 32);
    renderer.render();
  }

}
