import config from '../config.json';
import BG from '../gameObjects/Background';
const Start = {
  key: 'Start',
  preload() { },
  init() {
  },
  create() {
    this.music = this.sound.add('start_sound', { loop: true });
    this.music.volume = 0.1;
    this.music.play();
    this.BG = BG.create(this, false);
    this.logo = this.add.image(config.width / 2, 300, 'logo');
    this.text = this.add.text(config.width / 2 - 200, config.height / 2, 'PRESS ENTER TO START', config.textStyle);
    this.input.keyboard.on('keydown-' + 'ENTER', function() {
      this.music.stop();
      this.registry.destroy();
      this.events.off();
      this.scene.start('Main');
      this.scene.stop();
    }, this);
  },
  update() {
    this.BG.update(0.2);
  }
};
export default Start;
