import Phaser from 'phaser';

const _dialogs = {};
const _groups = {};

export default class Dialog {

  create(game, callback) {
    this.game = game;
    this.callback = callback;

    this.activeDialog = null;
    this.activeLine = 0;

    const group = this.group = game.add.group();
    group.fixedToCamera = true;
    group.cameraOffset.setTo(80, 80);

    const back = new Phaser.Sprite(game, 0, 0, 'player');
    group.add(back);

    this.text = new Phaser.Text(game, 0, 0, '', { font: '12px munro' });
    group.add(this.text);

    game.input.keyboard.addCallbacks(this, (e) => {
      switch (e.keyCode) {
        case Phaser.KeyCode.SPACEBAR:
          this.nextLine();
          break;
      }
    });
  }

  static add(key, jsonKey) {
    _dialogs[key] = jsonKey;
  }

  static addGroup(key, keys) {
    _groups[key] = keys;
  }

  nextLine() {
    if (this.activeDialog !== null) {
      if (this.activeLine === this.lastLine) {
        this.stop();
      } else {
        this.activeLine++;
      }
    }
  }

  play(key) {
    const jsonKey = _dialogs[key];
    const dialog = this.game.cache.getJSON(jsonKey);

    this.activeDialog = dialog;
    this.activeLine = 0;
    this.lastLine = dialog.lines.length - 1;

    this.callback('play');
  }

  playGroupRandom(key) {
    const group = _groups[key];
    const dialogKey = Phaser.ArrayUtils.getRandomItem(group);
    return this.play(dialogKey);
  }

  stop() {
    this.callback('stop');
    this.activeDialog = null;
    this.activeLine = 0;
  }

  update() {
    if (this.activeDialog !== null) {
      this.group.visible = true;
      const line = this.activeDialog.lines[this.activeLine];
      this.text.text = line;
    } else {
      this.group.visible = false;
    }
  }

}
