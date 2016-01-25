import Phaser from 'phaser';
import Dialog from '../helpers/Dialog';
import PuzzleState from './PuzzleState';
import renderer from '../renderer';

export default class LoadState extends Phaser.State {

  preload() {
    const { game } = this;

    // Load font
    game.load.bitmapFont('pixelade', require('file!../assets/fonts/Pixelade/font.png'), require('file!../assets/fonts/Pixelade/font.fnt'));
    game.load.bitmapFont('Press Start 2P', require('file!../assets/fonts/Press Start 2P/font_0.png'), require('file!../assets/fonts/Press Start 2P/font.fnt'));
    game.load.bitmapFont('PixelMix', require('file!../assets/fonts/PixelMix/font_0.png'), require('file!../assets/fonts/PixelMix/font.fnt'));
    game.load.bitmapFont('Pixel Operator', require('file!../assets/fonts/Pixel Operator/font_0.png'), require('file!../assets/fonts/Pixel Operator/font.fnt'));
    game.load.bitmapFont('Pixel Operator Bold', require('file!../assets/fonts/Pixel Operator Bold/font_0.png'), require('file!../assets/fonts/Pixel Operator Bold/font.fnt'));

    // Load sprites
    game.load.spritesheet('player', require('file!../assets/spritesheets/player.png'), 32, 32);
    game.load.spritesheet('asianStudent', require('file!../assets/spritesheets/asianStudent.png'), 32, 32);
    game.load.spritesheet('CanteenLady', require('file!../assets/spritesheets/CanteenLady.png'), 32, 32);
    game.load.spritesheet('LazyStudent', require('file!../assets/spritesheets/LazyStudent.png'), 32, 32);
    game.load.spritesheet('DesignStudent', require('file!../assets/spritesheets/DesignStudent.png'), 32, 32);
    game.load.spritesheet('SeniorStudent', require('file!../assets/spritesheets/SeniorStudent.png'), 32, 32);
    game.load.spritesheet('FirstYearStudent', require('file!../assets/spritesheets/FirstYearStudent.png'), 32, 32);
    game.load.spritesheet('FraternityBoy', require('file!../assets/spritesheets/FraternityBoy.png'), 32, 32);
    game.load.spritesheet('RaoulBloke', require('file!../assets/spritesheets/RaoulBloke.png'), 32, 32);
    game.load.spritesheet('VanDerSpock', require('file!../assets/spritesheets/VanDerSpock.png'), 32, 32);
    game.load.spritesheet('GewisMember', require('file!../assets/spritesheets/GewisMember.png'), 32, 32);
    game.load.spritesheet('HonourStudent', require('file!../assets/spritesheets/HonourStudent.png'), 32, 32);
    game.load.spritesheet('MasterStudent', require('file!../assets/spritesheets/MasterStudent.png'), 32, 32);
    game.load.spritesheet('RandomStudent-1', require('file!../assets/spritesheets/RandomStudent-1.png'), 32, 32);
    game.load.spritesheet('RandomStudent-2', require('file!../assets/spritesheets/RandomStudent-2.png'), 32, 32);
    game.load.spritesheet('WebScienceStudent', require('file!../assets/spritesheets/WebScienceStudent.png'), 32, 32);

    game.load.image('door-open', require('file!../assets/door-open.png'));

    game.load.image('dialog-arrow-more', require('file!../assets/dialog-arrow-more.png'));
    game.load.image('dialog-bubble-back', require('file!../assets/dialog-bubble-back.png'));
    game.load.image('dialog-bubble-arrow', require('file!../assets/dialog-bubble-arrow.png'));

    game.load.spritesheet('SelectBorder', require('file!../assets/puzzle-sprites/SelectBorder.png'), 32, 32);

    game.load.image('Gate-And', require('file!../assets/puzzle-sprites/Gate-And.png'));
    game.load.image('Gate-Or', require('file!../assets/puzzle-sprites/Gate-Or.png'));
    game.load.image('Gate-Not', require('file!../assets/puzzle-sprites/Gate-Not.png'));
    game.load.image('Gate-Pass', require('file!../assets/puzzle-sprites/Gate-Pass.png'));
    game.load.image('Gate-Xor', require('file!../assets/puzzle-sprites/Gate-Xor.png'));

    game.load.spritesheet('Pump-Right', require('file!../assets/puzzle-sprites/Pump-Right.png'), 32, 32);
    game.load.spritesheet('Sink-Left', require('file!../assets/puzzle-sprites/Sink-Left.png'), 32, 32);
    game.load.spritesheet('Socket', require('file!../assets/puzzle-sprites/Socket.png'), 32, 32);

    game.load.spritesheet('Wire-LeftRight', require('file!../assets/puzzle-sprites/Wire-LeftRight.png'), 32, 32);
    game.load.spritesheet('Wire-LeftTop', require('file!../assets/puzzle-sprites/Wire-LeftTop.png'), 32, 32);
    game.load.spritesheet('Wire-LeftBottom', require('file!../assets/puzzle-sprites/Wire-LeftBottom.png'), 32, 32);

    game.load.spritesheet('Wire-RightLeft', require('file!../assets/puzzle-sprites/Wire-RightLeft.png'), 32, 32);
    game.load.spritesheet('Wire-RightTop', require('file!../assets/puzzle-sprites/Wire-RightTop.png'), 32, 32);
    game.load.spritesheet('Wire-RightBottom', require('file!../assets/puzzle-sprites/Wire-RightBottom.png'), 32, 32);

    game.load.spritesheet('Wire-TopBottom', require('file!../assets/puzzle-sprites/Wire-TopBottom.png'), 32, 32);

    game.load.spritesheet('Wire-BottomTop', require('file!../assets/puzzle-sprites/Wire-BottomTop.png'), 32, 32);
    // game.load.spritesheet('Wire-BottomRight', require('file!../assets/puzzle-sprites/Wire-BottomRight-Green.png'), 32, 32);

    game.load.spritesheet('Wire-Gate-Left-In', require('file!../assets/puzzle-sprites/Wire-Gate-Left-In.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Right-In', require('file!../assets/puzzle-sprites/Wire-Gate-Right-In.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Top-In', require('file!../assets/puzzle-sprites/Wire-Gate-Top-In.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Bottom-In', require('file!../assets/puzzle-sprites/Wire-Gate-Bottom-In.png'), 32, 32);

    game.load.spritesheet('Wire-Gate-Left-Out', require('file!../assets/puzzle-sprites/Wire-Gate-Left-Out.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Right-Out', require('file!../assets/puzzle-sprites/Wire-Gate-Right-Out.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Top-Out', require('file!../assets/puzzle-sprites/Wire-Gate-Top-Out.png'), 32, 32);
    game.load.spritesheet('Wire-Gate-Bottom-Out', require('file!../assets/puzzle-sprites/Wire-Gate-Bottom-Out.png'), 32, 32);

    game.load.image('character-VanDerSpock', require('file!../assets/spritesheets/thumbnails/VanDerSpock.png'));
    game.load.image('character-asianStudent', require('file!../assets/spritesheets/thumbnails/asianStudent.png'));
    game.load.image('character-CanteenLady', require('file!../assets/spritesheets/thumbnails/CanteenLady.png'));
    game.load.image('character-DesignStudent', require('file!../assets/spritesheets/thumbnails/DesignStudent.png'));
    game.load.image('character-FirstYearStudent', require('file!../assets/spritesheets/thumbnails/FirstYearStudent.png'));
    game.load.image('character-FraternityBoy', require('file!../assets/spritesheets/thumbnails/FraternityBoy.png'));
    game.load.image('character-GewisMember', require('file!../assets/spritesheets/thumbnails/GewisMember.png'));
    game.load.image('character-HonourStudent', require('file!../assets/spritesheets/thumbnails/HonourStudent.png'));
    game.load.image('character-LazyStudent', require('file!../assets/spritesheets/thumbnails/LazyStudent.png'));
    game.load.image('character-MasterStudent', require('file!../assets/spritesheets/thumbnails/MasterStudent.png'));
    game.load.image('character-RandomStudent-1', require('file!../assets/spritesheets/thumbnails/RandomStudent-1.png'));
    game.load.image('character-RandomStudent-2', require('file!../assets/spritesheets/thumbnails/RandomStudent-2.png'));
    game.load.image('character-RaoulBloke', require('file!../assets/spritesheets/thumbnails/RaoulBloke.png'));
    game.load.image('character-SeniorStudent', require('file!../assets/spritesheets/thumbnails/SeniorStudent.png'));
    game.load.image('character-WebScienceStudent', require('file!../assets/spritesheets/thumbnails/WebScienceStudent.png'));
    game.load.image('character-LeTique', require('file!../assets/spritesheets/thumbnails/LeTique.png'));
    game.load.image('character-Message', require('file!../assets/spritesheets/thumbnails/Message.png'));
    game.load.image('character-Question', require('file!../assets/spritesheets/thumbnails/Question.png'));

    // Load music
    game.load.audio('hubMusic', require('file!../assets/audio/hubmusic.mp3'));
    game.load.audio('puzzleMusic', require('file!../assets/audio/Logicpuzzlemusic.mp3'));

    // Load map
    game.load.tilemap('auditorium_map', require('file!../assets/levels/auditorium.json'), null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('classroom_map', require('file!../assets/levels/classroom.json'), null, Phaser.Tilemap.TILED_JSON);
    game.load.image('soulsilver tileset', require('file!../assets/levels/soulsilver tileset.png'));
    game.load.image('tileset2', require('file!../assets/levels/tileset2.png'));

    // Load dialogs
    game.load.json('dialog-door-closed-1', require('file!../assets/dialogs/Basis/DoorClosed-1.json'));
    Dialog.add('door-closed-1', 'dialog-door-closed-1');
    game.load.json('dialog-door-closed-2', require('file!../assets/dialogs/Basis/DoorClosed-2.json'));
    Dialog.add('door-closed-2', 'dialog-door-closed-2');
    game.load.json('dialog-door-closed-3', require('file!../assets/dialogs/Basis/DoorClosed-3.json'));
    Dialog.add('door-closed-3', 'dialog-door-closed-3');
  	game.load.json('dialog-door-closed-4', require('file!../assets/dialogs/Basis/DoorClosed-4.json'));
    Dialog.add('door-closed-4', 'dialog-door-closed-4');
  	game.load.json('dialog-door-closed-5', require('file!../assets/dialogs/Basis/DoorClosed-5.json'));
    Dialog.add('door-closed-5', 'dialog-door-closed-5');
    Dialog.addGroup('door-closed', ['door-closed-1', 'door-closed-2', 'door-closed-3', 'door-closed-4', 'door-closed-5']);

    game.load.json('dialog-intro-1', require('file!../assets/dialogs/Basis/Intro-1.json'));
    Dialog.add('intro-1', 'dialog-intro-1');
	  game.load.json('dialog-intro-2', require('file!../assets/dialogs/Basis/Intro-2.json'));
    Dialog.add('intro-2', 'dialog-intro-2');

    game.load.json('dialog-AsianStudent-1', require('file!../assets/dialogs/AsianStudent-1.json'));
    Dialog.add('AsianStudent-1', 'dialog-AsianStudent-1');
    Dialog.addGroup('AsianStudent', ['AsianStudent-1']);

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
    game.load.json('dialog-LazyStudent-5', require('file!../assets/dialogs/LazyStudent-5.json'));
    Dialog.add('LazyStudent-5', 'dialog-LazyStudent-5');
    Dialog.addGroup('LazyStudent', ['LazyStudent-1', 'LazyStudent-2', 'LazyStudent-3', 'LazyStudent-4', 'LazyStudent-5']);

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

    game.load.json('dialog-VanDerSpock-1', require('file!../assets/dialogs/VanDerSpock-1.json'));
    Dialog.add('VanDerSpock-1', 'dialog-VanDerSpock-1');
    game.load.json('dialog-VanDerSpock-2', require('file!../assets/dialogs/VanDerSpock-2.json'));
    Dialog.add('VanDerSpock-2', 'dialog-VanDerSpock-2');
    game.load.json('dialog-VanDerSpock-3', require('file!../assets/dialogs/VanDerSpock-3.json'));
    Dialog.add('VanDerSpock-3', 'dialog-VanDerSpock-3');
    game.load.json('dialog-VanDerSpock-4', require('file!../assets/dialogs/VanDerSpock-4.json'));
    Dialog.add('VanDerSpock-4', 'dialog-VanDerSpock-4');
    game.load.json('dialog-VanDerSpock-5', require('file!../assets/dialogs/VanDerSpock-5.json'));
    Dialog.add('VanDerSpock-5', 'dialog-VanDerSpock-5');
    Dialog.addGroup('VanDerSpock', ['VanDerSpock-1', 'VanDerSpock-2', 'VanDerSpock-3', 'VanDerSpock-4', 'VanDerSpock-5']);

    game.load.json('dialog-WebScienceStudent-1', require('file!../assets/dialogs/WebScienceStudent-1.json'));
    Dialog.add('WebScienceStudent-1', 'dialog-WebScienceStudent-1');
    game.load.json('dialog-WebScienceStudent-2', require('file!../assets/dialogs/WebScienceStudent-2.json'));
    Dialog.add('WebScienceStudent-2', 'dialog-WebScienceStudent-2');
    game.load.json('dialog-WebScienceStudent-3', require('file!../assets/dialogs/WebScienceStudent-3.json'));
    Dialog.add('WebScienceStudent-3', 'dialog-WebScienceStudent-3');
    Dialog.addGroup('WebScienceStudent', ['WebScienceStudent-1', 'WebScienceStudent-2', 'WebScienceStudent-3']);

    game.load.json('dialog-Puzzle-LogicAndSet-1-Intro', require('file!../assets/dialogs/Puzzle/LogicAndSet/1/Intro.json'));
    Dialog.add('Puzzle-LogicAndSet-1-Intro', 'dialog-Puzzle-LogicAndSet-1-Intro');
    game.load.json('dialog-Puzzle-LogicAndSet-1-Outro', require('file!../assets/dialogs/Puzzle/LogicAndSet/1/Outro.json'));
    Dialog.add('Puzzle-LogicAndSet-1-Outro', 'dialog-Puzzle-LogicAndSet-1-Outro');
    game.load.json('dialog-Puzzle-LogicAndSet-1-Hint-1', require('file!../assets/dialogs/Puzzle/LogicAndSet/1/Hint-1.json'));
    Dialog.add('Puzzle-LogicAndSet-1-Hint-1', 'dialog-Puzzle-LogicAndSet-1-Hint-1');
    game.load.json('dialog-Puzzle-LogicAndSet-1-Hint-2', require('file!../assets/dialogs/Puzzle/LogicAndSet/1/Hint-2.json'));
    Dialog.add('Puzzle-LogicAndSet-1-Hint-2', 'dialog-Puzzle-LogicAndSet-1-Hint-2');
    Dialog.addGroup('Puzzle-LogicAndSet-1-Hints', ['Puzzle-LogicAndSet-1-Hint-1', 'Puzzle-LogicAndSet-1-Hint-2']);

    // Load puzzles
    game.load.json('Puzzle-LogicAndSet-1', require('file!../assets/puzzles/LogicAndSet/Puzzle-1ROEL.json'));
    game.load.json('Puzzle-LogicAndSet-2', require('file!../assets/puzzles/LogicAndSet/Puzzle-2.json'));
    game.load.json('Puzzle-LogicAndSet-3', require('file!../assets/puzzles/LogicAndSet/Puzzle-3.json'));
    game.load.json('Puzzle-LogicAndSet-4', require('file!../assets/puzzles/LogicAndSet/Puzzle-4.json'));
    game.load.json('Puzzle-LogicAndSet-5', require('file!../assets/puzzles/LogicAndSet/Puzzle-5.json'));
    game.load.json('Puzzle-LogicAndSet-6', require('file!../assets/puzzles/LogicAndSet/Puzzle-6.json'));
    // PuzzleState.add('Puzzle-LogicAndSet-1', 2);
  }

  create() {
    // Create nine-patch images
    this.game.cache.addNinePatch('dialog-bubble-back', 'dialog-bubble-back', 0, 4, 4, 4, 4);

    this.game.cache.getBitmapFont('Pixel Operator').font.lineHeight = 40;
    this.game.cache.getBitmapFont('Pixel Operator Bold').font.lineHeight = 40;

    // Create stage
    this.stage.backgroundColor = '#000000';
    this.graphics = this.game.add.graphics(0, 0);

    this.loadingText = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'loading');
    this.loadingText.anchor.setTo(0.5, 0.5);

    switch (this.game.env.state) {
      // Debug launch to specific state
      case 'hub':
        this.game.state.start('HubState');
        break;
      case 'puzzle':
        this.game.state.start('PuzzleState', true, false, { key: 'Puzzle-LogicAndSet-1' });
        break;

      default:
        // Regular launch
        setTimeout(() => {
          this.game.stateTransition.to('BlackState', true, false, {
            nextState: 'IntroState',
            nextParams: [],
            title: 'Software\nShenanigans'
          });
        }, 100);
    }
  }

  render() {
    this.graphics.beginFill('#000000');
    this.graphics.drawRect(0, 0, this.game.width, this.game.height);
    this.graphics.endFill();

    renderer.render();
  }

}
