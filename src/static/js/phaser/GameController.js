import Player from './Player';
import Enemies from './Enemies';
import config from './config.json';
import LifeBar from './LifeBar';

const GameController = {
  create(scene, cursors) {
    const newObj = {
      Player: null,
      Enemies: null,
      scoreText: null,
      HPText: null,
      LifeBar: null,
      construct(scene, cursors) {
        this.Player = Player.create(scene, cursors);
        this.Enemies = Enemies.create(scene, this.Player);
        this.scoreText = scene.add.text(config.width / 2 - 20, 10, 'SCORE:  ' + this.Player.score);
        this.bulletsText = scene.add.text(config.width - 150, 10, '');
        this.HPText = scene.add.text(20, 10, '');
        this.LifeBar = LifeBar.create(scene, 50, 10);
        return this;
      },
      update(scene) {
        this.Player.update();
        this.Enemies.update(scene);
        this.scoreText.setText('SCORE:  ' + this.Player.score);
        if (this.Player.maxBullets) {
          this.bulletsText.setText('Bullets:  ' + (this.Player.maxBullets - this.Player.bullets.length));
        }
        this.HPText.setText('HP:');
        this.LifeBar.set(this.Player.HP / this.Player.maxHP * 100);
      }
    };
    return newObj.construct(scene, cursors);
  }
};
export default GameController;
