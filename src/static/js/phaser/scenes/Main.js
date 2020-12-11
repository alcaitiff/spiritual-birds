import BG from '../Background';
import MyPlayer from '../Player';
import Enemies from '../Enemies';
import config from '../config.json';
const Main = {
  key: 'Main',
  preload() { },
  init() { },
  create() {
    BG.create(this);
    MyPlayer.create(this);
    Enemies.create(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.scoreText = this.add.text(config.width / 2 - 20, 10, 'SCORE:  ' + this.myPlayer.score);
    this.bulletsText = this.add.text(20, 10, 'Bullets:  ' + (this.myPlayer.maxBullets - this.myPlayer.bullets.length));
    this.input.keyboard.on('keydown-' + 'P', function() {
      this.music.pause();
      this.scene.sleep();
      this.scene.launch('Pause');
    }, this);
  },
  update() {
    MyPlayer.update(this);
    BG.update(this);
    Enemies.update(this);
    if (this.music.isPaused) {
      this.music.resume();
    }
    this.scoreText.setText('SCORE:  ' + this.myPlayer.score);
    this.bulletsText.setText('Bullets:  ' + (this.myPlayer.maxBullets - this.myPlayer.bullets.length));
  }
};
export default Main;
