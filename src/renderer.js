import Phaser from 'phaser';

let game;
let scale = 2;
let width;
let height;

const renderer = {
  canvas: null,
  context: null,

  init(_game) {
    game = _game;

    this.canvas = Phaser.Canvas.create(renderer, game.width * scale, game.height * scale);
    this.context = this.canvas.getContext('2d');
    Phaser.Canvas.addToDOM(this.canvas, 'container');

    game.stage.smoothed = false;
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
    Phaser.Canvas.setSmoothingEnabled(this.context, false);
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    Phaser.Canvas.setImageRenderingCrisp(this.canvas);

    game.canvas.style['display'] = 'none';

    width = this.canvas.width;
    height = this.canvas.height;
  },

  render() {
    if (this.canvas) {
      this.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, width, height);
    }
  }
};

export default renderer;
