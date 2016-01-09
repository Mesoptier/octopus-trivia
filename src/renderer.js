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
    game.stage.smoothed = false;

    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    game.canvas.style['display'] = 'none';
    this.canvas = Phaser.Canvas.create(renderer, game.width * scale, game.height * scale);
    this.context = this.canvas.getContext('2d');
    Phaser.Canvas.addToDOM(this.canvas, 'container');
    Phaser.Canvas.setSmoothingEnabled(this.context, false);

    width = this.canvas.width;
    height = this.canvas.height;
  },

  render() {
    this.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, width, height);
  }
};

export default renderer;
