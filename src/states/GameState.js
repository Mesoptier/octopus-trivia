export default class GameState extends Phaser.State {

  create() {
    this.stage.backgroundColor = '#ffffff';

    // Create test object
    let text = new Phaser.Text(this.game, 250, 250, 'Hello, world!', {
      font: '45px Arial',
      fill: '#ff0000'
    });
    text.anchor.set(0.5)
    this.stage.addChild(text);
  }

}
