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
    this.text = this.add.text(config.width / 2 - 80, config.height / 2 + config.top, 'GAME OVER', config.textStyle);
    this.text = this.add.text(config.width / 2 - 50, config.height / 2 + 50 + config.top, 'SCORE:' + score.value, config.textStyle);
    this.text = this.add.text(config.width / 2 - 200, config.height / 2 + 100 + config.top, 'PRESS ENTER TO RESTART', config.textStyle);
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
