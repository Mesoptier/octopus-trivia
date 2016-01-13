import Phaser from 'phaser';
import Dialog from '../helpers/Dialog';

export default class LoadState extends Phaser.State {

  preload() {
    const { game } = this;

    // Load font
    game.load.bitmapFont('pixelade', require('file!../assets/fonts/Pixelade/font.png'), require('file!../assets/fonts/Pixelade/font.fnt'));

    // Load sprites
    game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);

    game.load.image('dialog-back-large', require('file!../assets/dialog-back-large.png'));

    // Load map
    game.load.tilemap('auditorium_map', require('file!../assets/levels/auditorium.json'), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('soulsilver tileset', require('file!../assets/levels/soulsilver tileset.png'));
    game.load.image('tileset2', require('file!../assets/levels/tileset2.png'));

    // Load dialogs
    game.load.json('dialog-door-closed-1', require('file!../assets/dialogs/_BASIS-door-closed-1.json'));
    Dialog.add('door-closed-1', 'dialog-door-closed-1');
    game.load.json('dialog-door-closed-2', require('file!../assets/dialogs/_BASIS-door-closed-2.json'));
    Dialog.add('door-closed-2', 'dialog-door-closed-2');
	game.load.json('dialog-door-closed-3', require('file!../assets/dialogs/_BASIS-door-closed-3.json'));
    Dialog.add('door-closed-2', 'dialog-door-closed-2');
    Dialog.addGroup('door-closed', ['door-closed-1', 'door-closed-2', 'door-closed-3']);

    game.load.json('dialog-intro-1', require('file!../assets/dialogs/_BASIS-intro-1.json'));
    Dialog.add('intro', 'dialog-intro-1');
	game.load.json('dialog-intro-2', require('file!../assets/dialogs/_BASIS-intro-2.json'));
    Dialog.add('intro-2', 'dialog-intro-2');
	
	game.load.json('dialog-CanteenLady-1', require('file!../assets/dialogs/CanteenLady-1.json'));
    Dialog.add('CanteenLady-1', 'dialog-CanteenLady-1');
	game.load.json('dialog-CanteenLady-2', require('file!../assets/dialogs/CanteenLady-2.json'));
    Dialog.add('CanteenLady-2', 'dialog-CanteenLady-2');
	game.load.json('dialog-CanteenLady-3', require('file!../assets/dialogs/CanteenLady-3.json'));
    Dialog.add('CanteenLady-3', 'dialog-CanteenLady-3');
	game.load.json('dialog-CanteenLady-4', require('file!../assets/dialogs/CanteenLady-4.json'));
    Dialog.add('CanteenLady-4', 'dialog-CanteenLady-4');
	Dialog.addGroup('CanteenLady', ['CanteenLady-1', 'CanteenLady-2', 'CanteenLady-3', 'CanteenLady-4']);
	
	game.load.json('dialog-DesignStudent-1', require('file!../assets/dialogs/DesignStudent-1.json'));
    Dialog.add('DesignStudent-1', 'dialog-DesignStudent-1');
	game.load.json('dialog-DesignStudent-2', require('file!../assets/dialogs/DesignStudent-2.json'));
    Dialog.add('DesignStudent-2', 'dialog-DesignStudent-2');
	Dialog.addGroup('DesignStudent', ['DesignStudent-1', 'DesignStudent-2']);
	
	game.load.json('dialog-FirstYearStudent-1', require('file!../assets/dialogs/FirstYearStudent-1.json'));
    Dialog.add('FirstYearStudent-1', 'dialog-FirstYearStudent-1');
	game.load.json('dialog-FirstYearStudent-2', require('file!../assets/dialogs/FirstYearStudent-2.json'));
    Dialog.add('FirstYearStudent-2', 'dialog-FirstYearStudent-2');
	game.load.json('dialog-FirstYearStudent-3', require('file!../assets/dialogs/FirstYearStudent-3.json'));
    Dialog.add('FirstYearStudent-3', 'dialog-FirstYearStudent-3');
	game.load.json('dialog-FirstYearStudent-4', require('file!../assets/dialogs/FirstYearStudent-4.json'));
    Dialog.add('FirstYearStudent-4', 'dialog-FirstYearStudent-4');
	Dialog.addGroup('FirstYearStudent', ['FirstYearStudent-1', 'FirstYearStudent-2', 'FirstYearStudent-3', 'FirstYearStudent-4']);
	
	game.load.json('dialog-FraternityBoy-1', require('file!../assets/dialogs/FraternityBoy-1.json'));
    Dialog.add('FraternityBoy-1', 'dialog-FraternityBoy-1');
	game.load.json('dialog-FraternityBoy-2', require('file!../assets/dialogs/FraternityBoy-2.json'));
    Dialog.add('FraternityBoy-2', 'dialog-FraternityBoy-2');
	game.load.json('dialog-FraternityBoy-3', require('file!../assets/dialogs/FraternityBoy-3.json'));
    Dialog.add('FraternityBoy-3', 'dialog-FraternityBoy-3');
	Dialog.addGroup('FraternityBoy', ['FraternityBoy-1', 'FraternityBoy-2', 'FraternityBoy-3']);
	
	game.load.json('dialog-GewisMember-1', require('file!../assets/dialogs/GewisMember-1.json'));
    Dialog.add('GewisMember-1', 'dialog-GewisMember-1');
	game.load.json('dialog-GewisMember-2', require('file!../assets/dialogs/GewisMember-2.json'));
    Dialog.add('GewisMember-2', 'dialog-GewisMember-2');
	game.load.json('dialog-GewisMember-3', require('file!../assets/dialogs/GewisMember-3.json'));
    Dialog.add('GewisMember-3', 'dialog-GewisMember-3');
	Dialog.addGroup('GewisMember', ['GewisMember-1', 'GewisMember-2', 'GewisMember-3']);
	
	game.load.json('dialog-HonourStudent-1', require('file!../assets/dialogs/HonourStudent-1.json'));
    Dialog.add('HonourStudent-1', 'dialog-HonourStudent-1');
	game.load.json('dialog-HonourStudent-2', require('file!../assets/dialogs/HonourStudent-2.json'));
    Dialog.add('HonourStudent-2', 'dialog-HonourStudent-2');
	game.load.json('dialog-HonourStudent-3', require('file!../assets/dialogs/HonourStudent-3.json'));
    Dialog.add('HonourStudent-3', 'dialog-HonourStudent-3');
	Dialog.addGroup('HonourStudent', ['HonourStudent-1', 'HonourStudent-2', 'HonourStudent-3']);
	
	game.load.json('dialog-LazyStudent-1', require('file!../assets/dialogs/LazyStudent-1.json'));
    Dialog.add('LazyStudent-1', 'dialog-LazyStudent-1');
	game.load.json('dialog-LazyStudent-2', require('file!../assets/dialogs/LazyStudent-2.json'));
    Dialog.add('LazyStudent-2', 'dialog-LazyStudent-2');
	game.load.json('dialog-LazyStudent-3', require('file!../assets/dialogs/LazyStudent-3.json'));
    Dialog.add('LazyStudent-3', 'dialog-LazyStudent-3');
	game.load.json('dialog-LazyStudent-4', require('file!../assets/dialogs/LazyStudent-4.json'));
    Dialog.add('LazyStudent-4', 'dialog-LazyStudent-4');
	Dialog.addGroup('LazyStudent', ['LazyStudent-1', 'LazyStudent-2', 'LazyStudent-3', 'LazyStudent-4']);
	
	game.load.json('dialog-MasterStudent-1', require('file!../assets/dialogs/MasterStudent-1.json'));
    Dialog.add('MasterStudent-1', 'dialog-MasterStudent-1');
	game.load.json('dialog-MasterStudent-2', require('file!../assets/dialogs/MasterStudent-2.json'));
    Dialog.add('MasterStudent-2', 'dialog-MasterStudent-2');
	game.load.json('dialog-MasterStudent-3', require('file!../assets/dialogs/MasterStudent-3.json'));
    Dialog.add('MasterStudent-3', 'dialog-MasterStudent-3');
	game.load.json('dialog-MasterStudent-4', require('file!../assets/dialogs/MasterStudent-4.json'));
    Dialog.add('MasterStudent-4', 'dialog-MasterStudent-4');
	game.load.json('dialog-MasterStudent-5', require('file!../assets/dialogs/MasterStudent-5.json'));
    Dialog.add('MasterStudent-5', 'dialog-MasterStudent-5');
	game.load.json('dialog-MasterStudent-6', require('file!../assets/dialogs/MasterStudent-6.json'));
    Dialog.add('MasterStudent-6', 'dialog-MasterStudent-6');
	Dialog.addGroup('MasterStudent', ['MasterStudent-1', 'MasterStudent-2', 'MasterStudent-3', 'MasterStudent-4', 'MasterStudent-5', 'MasterStudent-6']);
	
	game.load.json('dialog-RandomStudent-1', require('file!../assets/dialogs/RandomStudent-1.json'));
    Dialog.add('RandomStudent-1', 'dialog-RandomStudent-1');
	game.load.json('dialog-RandomStudent-2', require('file!../assets/dialogs/RandomStudent-2.json'));
    Dialog.add('RandomStudent-2', 'dialog-RandomStudent-2');
	game.load.json('dialog-RandomStudent-3', require('file!../assets/dialogs/RandomStudent-3.json'));
    Dialog.add('RandomStudent-3', 'dialog-RandomStudent-3');
	game.load.json('dialog-RandomStudent-4', require('file!../assets/dialogs/RandomStudent-4.json'));
    Dialog.add('RandomStudent-4', 'dialog-RandomStudent-4');
	game.load.json('dialog-RandomStudent-5', require('file!../assets/dialogs/RandomStudent-5.json'));
    Dialog.add('RandomStudent-5', 'dialog-RandomStudent-5');
	game.load.json('dialog-RandomStudent-6', require('file!../assets/dialogs/RandomStudent-6.json'));
    Dialog.add('RandomStudent-6', 'dialog-RandomStudent-6');
	game.load.json('dialog-RandomStudent-7', require('file!../assets/dialogs/RandomStudent-7.json'));
    Dialog.add('RandomStudent-7', 'dialog-RandomStudent-7');
	game.load.json('dialog-RandomStudent-8', require('file!../assets/dialogs/RandomStudent-8.json'));
    Dialog.add('RandomStudent-8', 'dialog-RandomStudent-8');
	game.load.json('dialog-RandomStudent-9', require('file!../assets/dialogs/RandomStudent-9.json'));
    Dialog.add('RandomStudent-9', 'dialog-RandomStudent-9');
	game.load.json('dialog-RandomStudent-10', require('file!../assets/dialogs/RandomStudent-10.json'));
    Dialog.add('RandomStudent-10', 'dialog-RandomStudent-10');
	game.load.json('dialog-RandomStudent-11', require('file!../assets/dialogs/RandomStudent-11.json'));
    Dialog.add('RandomStudent-11', 'dialog-RandomStudent-11');
	game.load.json('dialog-RandomStudent-12', require('file!../assets/dialogs/RandomStudent-12.json'));
    Dialog.add('RandomStudent-12', 'dialog-RandomStudent-12');
	Dialog.addGroup('RandomStudent', ['RandomStudent-1', 'RandomStudent-2', 'RandomStudent-3', 'RandomStudent-4', 'RandomStudent-5', 'RandomStudent-6', 'RandomStudent-7', 'RandomStudent-8', 'RandomStudent-9', 'RandomStudent-10', 'RandomStudent-11', 'RandomStudent-12']);
	
	game.load.json('dialog-RaoulBloke-1', require('file!../assets/dialogs/RaoulBloke-1.json'));
    Dialog.add('RaoulBloke-1', 'dialog-RaoulBloke-1');
	game.load.json('dialog-RaoulBloke-2', require('file!../assets/dialogs/RaoulBloke-2.json'));
    Dialog.add('RaoulBloke-2', 'dialog-RaoulBloke-2');
	game.load.json('dialog-RaoulBloke-3', require('file!../assets/dialogs/RaoulBloke-3.json'));
    Dialog.add('RaoulBloke-3', 'dialog-RaoulBloke-3');
	Dialog.addGroup('RaoulBloke', ['RaoulBloke-1', 'RaoulBloke-2', 'RaoulBloke-3']);
	
	game.load.json('dialog-SeniorStudent-1', require('file!../assets/dialogs/SeniorStudent-1.json'));
    Dialog.add('SeniorStudent-1', 'dialog-SeniorStudent-1');
	game.load.json('dialog-SeniorStudent-2', require('file!../assets/dialogs/SeniorStudent-2.json'));
    Dialog.add('SeniorStudent-2', 'dialog-SeniorStudent-2');
	game.load.json('dialog-SeniorStudent-3', require('file!../assets/dialogs/SeniorStudent-3.json'));
    Dialog.add('SeniorStudent-3', 'dialog-SeniorStudent-3');
	game.load.json('dialog-SeniorStudent-4', require('file!../assets/dialogs/SeniorStudent-4.json'));
    Dialog.add('SeniorStudent-4', 'dialog-SeniorStudent-4');
	Dialog.addGroup('SeniorStudent', ['SeniorStudent-1', 'SeniorStudent-2', 'SeniorStudent-3', 'SeniorStudent-4']);
	
	game.load.json('dialog-VanDenSpock-1', require('file!../assets/dialogs/VanDenSpock-1.json'));
    Dialog.add('VanDenSpock-1', 'dialog-VanDenSpock-1');
	game.load.json('dialog-VanDenSpock-2', require('file!../assets/dialogs/VanDenSpock-2.json'));
    Dialog.add('VanDenSpock-2', 'dialog-VanDenSpock-2');
	game.load.json('dialog-VanDenSpock-3', require('file!../assets/dialogs/VanDenSpock-3.json'));
    Dialog.add('VanDenSpock-3', 'dialog-VanDenSpock-3');
	game.load.json('dialog-VanDenSpock-4', require('file!../assets/dialogs/VanDenSpock-4.json'));
    Dialog.add('VanDenSpock-4', 'dialog-VanDenSpock-4');
	game.load.json('dialog-VanDenSpock-5', require('file!../assets/dialogs/VanDenSpock-5.json'));
    Dialog.add('VanDenSpock-5', 'dialog-VanDenSpock-5');
	Dialog.addGroup('VanDenSpock', ['VanDenSpock-1', 'VanDenSpock-2', 'VanDenSpock-3', 'VanDenSpock-4', 'VanDenSpock-5']);
	
	game.load.json('dialog-WebScienceStudent-1', require('file!../assets/dialogs/WebScienceStudent-1.json'));
    Dialog.add('WebScienceStudent-1', 'dialog-WebScienceStudent-1');
	game.load.json('dialog-WebScienceStudent-2', require('file!../assets/dialogs/WebScienceStudent-2.json'));
    Dialog.add('WebScienceStudent-2', 'dialog-WebScienceStudent-2');
	game.load.json('dialog-WebScienceStudent-3', require('file!../assets/dialogs/WebScienceStudent-3.json'));
    Dialog.add('WebScienceStudent-3', 'dialog-WebScienceStudent-3');
	Dialog.addGroup('WebScienceStudent', ['WebScienceStudent-1', 'WebScienceStudent-2', 'WebScienceStudent-3']);
	
  }

  create() {
    const text = this.game.add.text(0, 0, 'dummy', { font: '20px Munro' });
    text.destroy();
    this.game.state.start('IntroState');
  }

}
