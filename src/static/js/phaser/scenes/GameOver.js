import config from '../config.json';
import BG from '../gameObjects/Background';
const GameOver = {
  key: 'GameOver',
  preload() { },
  init() {
  },
  create(score) {
    this.BG = BG.create(this, false);
    this.logo = this.add.image(config.width / 2, 200, 'logo');
    this.text = this.add.text(config.width / 2 - 40, config.height / 2, 'GAME OVER');
    this.text = this.add.text(config.width / 2 - 30, config.height / 2 + 50, 'SCORE:' + score.value);
    this.text = this.add.text(config.width / 2 - 100, config.height / 2 + 100, 'PRESS ENTER TO RESTART');
    this.input.keyboard.on('keydown-' + 'ENTER', function() {
      this.registry.destroy();
      this.events.off();
      this.scene.start('Main');
      this.scene.stop();
    }, this);
  },
  update() {
    this.BG.update(0.5);
  }
};
export default GameOver;
