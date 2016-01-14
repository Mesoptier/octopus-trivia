import Phaser from 'phaser';
import Player from '../objects/Player';
import Dialog from '../helpers/Dialog';
import renderer from '../renderer';

const puzzles = {};

export default class PuzzleState extends Phaser.State {

  static add(key, numHints) {
    puzzles[key] = {
      dialog: key + '-Dialog',
      question: key + '-Question',
      hints: []
    };

    for (let i = 0; i < numHints; i++) {
      puzzles[key].hints.push(key + '-Hint-' + i);
    }
  }

  init({ key }) {
    this.key = key;
    this.activePuzzle = puzzles[key];
  }

  create() {
    const { game } = this;

    game.add.image(0, 0, 'puzzle-background');
    game.add.image(0, 0, 'puzzle-gate-back');

    game.add.button(0, 249, 'puzzle-exit', this.onExit, this, 0, 0, 0);
    game.add.button(48, 249, 'puzzle-hint', this.onHint, this, 0, 0, 0);
    game.add.button(344, 0, 'puzzle-wire', this.onWire, this, 0, 0, 0);
    game.add.button(344, 114, 'puzzle-discard', this.onDiscard, this, 0, 0, 0);
    game.add.button(344, 153, 'puzzle-submit', this.onSubmit, this, 0, 0, 0);

    // Create dialog
    this.dialog = new Dialog('small');
    this.dialog.create(game, (state, ...params) => {
      console.log(state, params);

      switch (state) {
        case 'stop':
          setTimeout(() => { this.dialog.play(this.activePuzzle.question); });
          break;
      }
    });

    // Start puzzle dialog
    this.dialog.play(this.activePuzzle.dialog);
  }

  onExit() {

  }

  onHint() {

  }

  onWire() {

  }

  onDiscard() {

  }

  onSubmit() {

  }

  update() {
    this.dialog.update();
  }

  render() {
    renderer.render();
  }

}
