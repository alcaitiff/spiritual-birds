import BG from '../Background';
import GameController from '../GameController';
const Main = {
  key: 'Main',
  preload() { },
  init() { },
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.BG = BG.create(this, true);
    this.GameController = GameController.create(this, this.cursors);
    this.input.keyboard.on('keydown-' + 'P', function() {
      this.BG.music.pause();
      this.scene.sleep();
      this.scene.launch('Pause');
    }, this);
  },
  update() {
    this.BG.update();
    if (this.BG.music.isPaused) {
      this.BG.music.resume();
    }
    this.GameController.update(this);
  }
};
export default Main;
