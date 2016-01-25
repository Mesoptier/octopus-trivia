import Phaser from 'phaser';

const _dialogs = {};
const _groups = {};

export default class Dialog {

  create(game, callback) {
    this.game = game;
    this.callback = callback;

    this.activeDialog = null;
    this.activeLine = 0;
    this.showCharacterName = 0;

    const group = this.group = game.add.group();

    this.back = new Phaser.NinePatchImage(game, 0, 0, 'dialog-bubble-back');
    group.add(this.back);

    this.backArrow = new Phaser.Image(game, 0, 0, 'dialog-bubble-arrow');
    this.backArrow.anchor.setTo(0.5, 0);
    group.add(this.backArrow);

    // Text
    const maxWidth = 200;

    this.text = new Phaser.BitmapText(game, 8, 8, 'Pixel Operator', '', 8);
    this.text.tint = '#000000';
    this.text.maxWidth = maxWidth;
    group.add(this.text);

    this.nameText = new Phaser.BitmapText(game, 8, 8, 'Pixel Operator Bold', '', 8);
    this.nameText.tint = '#000000';
    this.nameText.maxWidth = maxWidth;
    group.add(this.nameText);

    // More (arrow + text)
    this.moreArrow = new Phaser.Image(game, 0, 2, 'dialog-arrow-more');
    this.moreArrow.anchor.setTo(1, 1);
    group.add(this.moreArrow);

    // Add input callbacks
    const spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(this.nextLine, this);
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
        const line = this.activeDialog[this.activeLine];
        const [type, ...params] = line;

        if (type === 'character') {
          this.activeCharacter = params[0];
          this.showCharacterName = 2;
        }

        if (type === 'align') {
          this.setAlign(params[0]);
        }

        if (type === 'event') {
          this.callback(...params);
        }

        this.nextLine();
      } else {
        this.currentPosition = 0;
        this.showCharacterName--;
      }
    }
  }

  play(key, { entity = null, x, y } = {}) {
    const jsonKey = _dialogs[key];
    const dialog = this.game.cache.getJSON(jsonKey);

    this.activeKey = key;
    this.activeDialog = dialog;
    this.activeCharacter = '';
    this.activeLine = -1;
    this.lastLine = dialog.length - 1;

    this.setEntity(entity);
    this.setAlign('center');

    this.nextLine();

    this.callback('play', this.activeKey, entity);
  }

  playGroupRandom(key, entity) {
    const group = _groups[key];
    const dialogKey = Phaser.ArrayUtils.getRandomItem(group);
    return this.play(dialogKey, entity);
  }

  stop() {
    this.callback('stop', this.activeKey);
    this.activeDialog = null;
    this.activeLine = 0;
    this.activeEntity = null;
  }

  update() {
    if (this.activeDialog !== null) {
      this.group.visible = true;
      const isLastLine = this.activeLine === this.lastLine;
      const characterName = this.getActiveCharacterName();

      let line = this.activeDialog[this.activeLine];

      this.text.text = line;

      if (!isLastLine) {
        // Add padding for the "more" arrow
        this.text.text = this.text.text + ' __';
      }

      if (characterName && this.showCharacterName > 0) {
        // Add extra line for the name
        this.text.text = '\n' + this.text.text;

        this.nameText.text = characterName;
        this.nameText.visible = true;
      } else {
        this.nameText.visible = false;
      }

      let textWidth = this.text.textWidth;
      let textHeight = this.text.textHeight;

      if (this.nameText.visible) {
        textWidth = Math.max(textWidth, this.nameText.textWidth);
        textHeight += 4;
      }

      // Move the text down a few pixels when the name is visible
      this.text.y = this.nameText.visible ? 12 : 8;

      this.back.targetWidth = textWidth + 16;
      this.back.targetHeight = textHeight + 13;

      this.backArrow.visible = this.activeEntity !== null;

      this.backArrow.x = 13;
      this.backArrow.y = this.back.currentHeight - 2;
      this.moreArrow.x = this.back.currentWidth - 8;
      this.moreArrow.y = this.back.currentHeight - 7;

      let dialogX = this.activeX;

      if (this.activeAlign === 'center') {
        this.backArrow.x = this.back.currentWidth / 2;
        dialogX -= this.back.currentWidth / 2;
      } else if (this.activeAlign === 'right') {
        this.backArrow.x = this.back.currentWidth - 13;
        dialogX -= this.back.currentWidth - 12;
      }

      this.group.x = Math.round(dialogX);
      this.group.y = Math.round(this.activeY - this.back.currentHeight);

      if (this.activeEntity) {
        this.group.y = this.group.y - 20;
      }

      this.text.text = line.substring(0, this.currentPosition);

      if (characterName && this.showCharacterName > 0) {
        this.text.text = '\n' + this.text.text;
      }

      if (this.currentPosition < line.length) {
        this.currentPosition++;
      }

      this.moreArrow.visible = !isLastLine && this.currentPosition >= line.length;

    } else {
      this.group.visible = false;
    }
  }

  setEntity(entity) {
    this.activeEntity = entity;
    this.activeX = entity ? entity.x : this.game.camera.x + this.game.camera.width / 2;
    this.activeY = entity ? entity.y : this.game.camera.y + this.game.camera.height / 2;
  }

  setAlign(align) {
    this.activeAlign = align;
  }

  getActiveCharacterName() {
    let name = '';

    switch (this.activeCharacter) {
      case 'InformationScreen': break;
      case 'RaoulBloke': name = 'Raoul Bloke'; break;
      case 'VanDerSpock': name = 'Mr. Van Der Spock'; break;
      case 'FirstYearStudent': name = 'First Year Student'; break;
      case 'AsianStudent': name = 'Asian Student'; break;
      case 'CanteenLady': name = 'Canteen Lady'; break;
      case 'DesignStudent': name = 'Design Student'; break;
      case 'FraternityBoy': name = 'Fraternity Boy'; break;
      case 'GewisMember': name = 'Gewis Member'; break;
      case 'HonourStudent': name = 'Honour Student'; break;
      case 'LazyStudent': name = 'Lazy Student'; break;
      case 'MasterStudent': name = 'Master Student'; break;
      case 'RandomStudent': break;
      case 'RandomStudent-1': break;
      case 'RandomStudent-2': break;
      case 'SeniorStudent': name = 'Senior Student'; break;
      case 'WebScienceStudent': name = 'Web Science Student'; break;
      case 'LeTique': name = 'Mr. Le Tique'; break;
      default: name = this.activeCharacter;
    }

    return name;
  }

}
