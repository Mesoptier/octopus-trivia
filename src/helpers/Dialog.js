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
    group.cameraOffset.setTo(0, 192);

    const back = new Phaser.Image(game, 0, 0, 'dialog-back-large');
    group.add(back);

    this.text = new Phaser.BitmapText(game, 10, 10, 'pixelade', '', 13);
    this.text.tint = '#000000';
    this.text.maxWidth = 300;
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
        return this.stop();
      }

      this.activeLine++;

      if (Array.isArray(this.activeDialog[this.activeLine])) {
        this.activeCharacter = this.activeDialog[this.activeLine][1];
        this.nextLine();
      }
    }
  }

  play(key) {
    const jsonKey = _dialogs[key];
    const dialog = this.game.cache.getJSON(jsonKey);

    this.activeDialog = dialog;
    this.activeCharacter = '';
    this.activeLine = -1;
    this.lastLine = dialog.length - 1;

    this.nextLine();

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
      let line = this.activeDialog[this.activeLine];
      let characterName = this.getActiveCharacterName();

      if (characterName) {
        line = characterName + '\n' + characterName.replace(/./g, '-') + '\n' + line;
      }

      this.text.text = line;
    } else {
      this.group.visible = false;
    }
  }

  getActiveCharacterName() {
    let name = '';

    switch (this.activeCharacter) {
      case 'InformationScreen': name = 'TEST'; break;
    }

    return name;
  }

  getActiveCharacterImage() {
    return this.activeCharacter;
  }

}
