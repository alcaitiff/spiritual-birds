import BG from '../Background';
import Player from '../Player';
import Enemies from '../Enemies';
import config from '../config.json';
import LifeBar from '../LifeBar';
const Main = {
  key: 'Main',
  preload() { },
  init() { },
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.BG = BG.create(this, true);
    this.Player = Player.create(this, this.cursors);
    this.Enemies = Enemies.create(this, this.Player);
    this.scoreText = this.add.text(config.width / 2 - 20, 10, 'SCORE:  ' + this.Player.score);
    this.bulletsText = this.add.text(config.width - 150, 10, '');
    this.HPText = this.add.text(20, 10, '');
    this.LifeBar = LifeBar.create(this, 40, 10);
    this.input.keyboard.on('keydown-' + 'P', function() {
      this.BG.music.pause();
      this.scene.sleep();
      this.scene.launch('Pause');
    }, this);
  },
  update() {
    this.Player.update();
    this.BG.update();
    this.Enemies.update(this);
    if (this.BG.music.isPaused) {
      this.BG.music.resume();
    }
    this.scoreText.setText('SCORE:  ' + this.Player.score);
    if (this.Player.maxBullets) {
      this.bulletsText.setText('Bullets:  ' + (this.Player.maxBullets - this.Player.bullets.length));
    }
    this.HPText.setText('HP:  ');
    this.LifeBar.set(this.Player.HP / this.Player.maxHP * 100);
  }
};
export default Main;
