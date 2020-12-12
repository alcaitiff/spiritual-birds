import config from '../config.json';
import BG from '../Background';
const Start = {
  key: 'Start',
  preload() { },
  init() {
  },
  create() {
    this.music = this.sound.add('start_sound', { loop: true });
    this.music.volume = 0.3;
    this.music.play();
    this.BG = BG.create(this, false);
    this.logo = this.add.image(config.width / 2, 300, 'logo');
    this.text = this.add.text(config.width / 2 - 100, config.height / 2 + 100, 'PRESS ENTER TO START');
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
