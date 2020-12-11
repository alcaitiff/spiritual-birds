import config from '../config.json';
const Death = {
  key: 'Death',
  preload() { },
  init() {
  },
  create(score) {
    this.text = this.add.text(config.width / 2 - 50, config.height / 2, 'GAME OVER');
    this.text = this.add.text(config.width / 2 - 50, config.height / 2 + 50, 'BEST SCORE:' + score.value);
    this.text = this.add.text(config.width / 2 - 100, config.height / 2 + 100, 'PRESS ENTER TO RESTART');
    this.input.keyboard.on('keydown-' + 'ENTER', function() {
      this.registry.destroy();
      this.events.off();
      this.scene.start('Main');
      this.scene.stop();
    }, this);
  },
  update() { }
};
export default Death;
