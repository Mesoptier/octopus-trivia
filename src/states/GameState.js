export default class GameState extends Phaser.State {

  create() {
    const cw = this.game.width;
    const ch = this.game.height;

    this.stage.backgroundColor = '#ffffff';
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create test object
    this.text = new Phaser.Text(this.game, cw / 2, ch / 2, 'Hello, world!', {
      font: '45px Arial',
      fill: '#ff0000'
    });
    this.text.anchor.set(0.5)
    this.stage.addChild(this.text);
  }

  update() {
    const speed = 5;

    if (this.cursors.left.isDown)
      this.text.x -= speed;
    if (this.cursors.right.isDown)
      this.text.x += speed;

    if (this.cursors.up.isDown)
      this.text.y -= speed;
    if (this.cursors.down.isDown)
      this.text.y += speed;
  }

}
