import Phaser from 'phaser';
import Preload from './scenes/Preload';
import Main from './scenes/Main';
import Pause from './scenes/Pause';
import GameOver from './scenes/GameOver';
import Start from './scenes/Start';
import config from './config.json';
const game = {
  type: Phaser.AUTO,
  width: config.width,
  height: config.height,
  backgroundColor: config.backgroundColor,
  cursors: null,
  pixelArt: false,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: config.gravity
      },
      debug: config.debug
    }
  },
  scene: [Preload, Start, Main, Pause, GameOver]
};
export default game;
