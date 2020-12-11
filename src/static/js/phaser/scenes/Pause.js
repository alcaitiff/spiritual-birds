import config from '../config.json';
const Pause = {
  key: 'Pause',
  preload() { },
  init() {
  },
  create() {
    this.text = this.add.text(config.width / 2, config.height / 2, 'PAUSE');
    this.input.keyboard.on('keydown-' + 'P', function() {
      this.scene.wake('Main');
      this.scene.stop();
    }, this);
  },
  update() { }
};
export default Pause;
