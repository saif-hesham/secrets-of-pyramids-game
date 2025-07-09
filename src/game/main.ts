import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Level1 } from './scenes/Level1';
import { Level2 } from './scenes/Level2';
import { Level3 } from './scenes/Level3';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader';

//  Super Pharaoh Game Configuration
//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#D2691E', // Sandy brown background
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800, x: 0 },
            debug: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Level1,
        Level2,
        Level3,
        GameOver
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
