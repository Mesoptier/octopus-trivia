import Phaser from 'phaser';

let game;
let scale = 2;
let canvas;
let context;
let width;
let height;

export function init(_game) {
  game = _game;

  game.canvas.style['display'] = 'none';
  canvas = Phaser.Canvas.create(game.width * scale, game.height * scale);
  context = canvas.getContext('2d');
  Phaser.Canvas.addToDOM(canvas, 'container');
  Phaser.Canvas.setSmoothingEnabled(context, false);

  width = canvas.width;
  height = canvas.height;
};

export function render() {
  context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, width, height);
};
