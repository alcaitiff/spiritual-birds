import Player from './Player';
import Enemies from './Enemies';
import config from './config.json';
import LifeBar from './LifeBar';
import PowerUp from './PowerUP';

const GameController = {
  create(scene, cursors) {
    const newObj = {
      Player: null,
      Enemies: null,
      PowerUps: [],
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
      updateEnemies(scene) {
        if (this.Enemies.Types.GrayBird.fleed < 20) {
          this.Enemies.Types.GrayBird.min = 2;
        } else {
          this.Enemies.Types.GrayBird.min = Math.round(this.Enemies.Types.GrayBird.fleed / 10);
        }
        this.Enemies.update(scene);
      },
      updateUI(scene) {
        this.scoreText.setText('SCORE:  ' + this.Player.score);
        if (this.Player.maxBullets) {
          this.bulletsText.setText('Bullets:  ' + (this.Player.maxBullets - this.Player.bullets.length));
        }
        this.HPText.setText('HP:');
        this.LifeBar.set(this.Player.HP / this.Player.maxHP * 100);
      },
      updatePowerUps(scene) {
        this.PowerUps.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.PowerUps.splice(index, 1);
          };
        });
      },
      update(scene) {
        this.Player.update();
        this.updateEnemies();
        this.updatePowerUps();

        if (this.Enemies.Types.GrayBird.fleed === 2 && this.PowerUps.length === 0) {
          this.PowerUps.push(PowerUp.create(scene, this.Player, config.width / 2, config.height / 2));
        }

        this.updateUI();
      }
    };
    return newObj.construct(scene, cursors);
  }
};
export default GameController;
