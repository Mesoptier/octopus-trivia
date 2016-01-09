import Phaser from 'phaser';

let game;
let scale = 2;
let canvas;
let context;
let width;
let height;

const renderer = {
  init(_game) {
    game = _game;
    game.stage.smoothed = false;

    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
    game.canvas.style['display'] = 'none';
    canvas = Phaser.Canvas.create(renderer, game.width * scale, game.height * scale);
    context = canvas.getContext('2d');
    Phaser.Canvas.addToDOM(canvas, 'container');
    Phaser.Canvas.setSmoothingEnabled(context, false);

    width = canvas.width;
    height = canvas.height;
  },

  render() {
    context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, width, height);
  }
};

export default renderer;
