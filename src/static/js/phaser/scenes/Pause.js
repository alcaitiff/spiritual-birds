import config from '../config.json';
import BG from '../gameObjects/Background';
const Pause = {
  key: 'Pause',
  preload() { },
  init() {
  },
  create() {
    this.BG = BG.create(this, false);
    this.text = this.add.text(config.width / 2 - 50, config.height / 2 + config.top, 'PAUSE', config.textStyle);
    this.input.keyboard.on('keydown-' + 'P', function() {
      this.scene.wake('Main');
      this.scene.stop();
    }, this);
  },
  update() {
    this.BG.update(0.1);
  }
};
export default Pause;
