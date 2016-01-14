import Phaser from 'phaser';

const _dialogs = {};
const _groups = {};

export default class Dialog {

  constructor(type = 'large') {
    this.type = type;
  }

  create(game, callback) {
    this.game = game;
    this.callback = callback;

    this.activeDialog = null;
    this.activeLine = 0;

    const group = this.group = game.add.group();
    group.fixedToCamera = true;
    group.cameraOffset.setTo(this.type == 'large' ? 0 : 96, 192);

    const back = new Phaser.Image(game, 0, 0, 'dialog-back-' + this.type);
    group.add(back);

    // Text
    this.text = new Phaser.BitmapText(game, 10, 10, 'pixelade', '', 13);
    this.text.tint = '#000000';
    this.text.maxWidth = (this.type == 'large' ? 300 : 200);
    group.add(this.text);

    // More (arrow + text)
    this.moreGroup = game.add.group();
    this.moreGroup.position.setTo(10, 75);
    group.add(this.moreGroup);

    const moreText = new Phaser.BitmapText(game, 13, 0, 'pixelade', '[SPACE]', 13);
    moreText.tint = '#000000';
    this.moreGroup.add(moreText);

    const moreArrow = new Phaser.Image(game, 0, 2, 'dialog-arrow-more');
    this.moreGroup.add(moreArrow);

    this.characterImage = new Phaser.Image(game, 322, 3, '');
    group.add(this.characterImage);

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
          this.characterImage.loadTexture(this.getActiveCharacterImage());
        }

        if (type === 'event') {
          this.callback(...params);
        }

        this.nextLine();
      }
    }
  }

  play(key) {
    const jsonKey = _dialogs[key];
    const dialog = this.game.cache.getJSON(jsonKey);

    this.activeKey = key;
    this.activeDialog = dialog;
    this.activeCharacter = '';
    this.activeLine = -1;
    this.lastLine = dialog.length - 1;
    this.characterImage.loadTexture('');

    this.nextLine();

    this.callback('play', this.activeKey);
  }

  playGroupRandom(key) {
    const group = _groups[key];
    console.log(key, group);
    const dialogKey = Phaser.ArrayUtils.getRandomItem(group);
    return this.play(dialogKey);
  }

  stop() {
    this.callback('stop', this.activeKey);
    this.activeDialog = null;
    this.activeLine = 0;
  }

  update() {
    if (this.activeDialog !== null) {
      this.group.visible = true;
      const isLastLine = this.activeLine === this.lastLine;
      const characterName = this.getActiveCharacterName();

      let line = this.activeDialog[this.activeLine];

      if (characterName) {
        line = '[ ' + characterName + ' ]\n' + line;
      }

      this.text.text = line;

      // Hide "v [SPACE]" when on the last line
      // this.moreGroup.visible = !isLastLine;

    } else {
      this.group.visible = false;
    }
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
      case 'RandomStudent-1': name = 'Random Student'; break;
      case 'RandomStudent-2': name = 'Random Student'; break;
      case 'SeniorStudent': name = 'Senior Student'; break;
      case 'WebScienceStudent': name = 'Web Science Student'; break;
      default: name = this.activeCharacter;
    }

    return name;
  }

  getActiveCharacterImage() {
    if (this.activeCharacter === 'RandomStudent') {
      if (this.randomCharacterNum === undefined) {
        this.randomCharacterNum = this.game.rnd.integerInRange(1, 2);
      }
      return 'character-' + this.activeCharacter + '-' + this.randomCharacterNum;
    } else {
      return 'character-' + this.activeCharacter;
    }
  }

}
