import config from '../config.json';
import LifeBar from '../gameObjects/LifeBar';
import PowerUPWheel from '../gameObjects/PowerUPWheel';

const UIController = {
  anims: {
    powerupAppear: null,
    powerupDisappear: null
  },
  initialize(scene) {
    if (!this.anims.powerupAppear) {
      this.anims.powerupAppear = scene.anims.create({
        key: 'powerup-ico-appear',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: 0
      });
    }
    if (!this.anims.powerupDisappear) {
      this.anims.powerupDisappear = scene.anims.create({
        key: 'powerup-ico-disappear',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 8, end: 14 }),
        frameRate: 20,
        repeat: 0
      });
    }
  },
  create(scene, player) {
    this.initialize(scene);
    const newObj = {
      anims: this.anims,
      Player: player,
      Enemies: null,
      PowerUps: [],
      scoreText: null,
      HPText: null,
      LifeBar: null,
      LastBulletsValue: 0,
      HelpTextDuration: 0,
      bullets: [],
      construct(scene, player) {
        this.Player = player;
        this.scoreText = scene.add.text(config.width / 2 - 40, 10, 'SCORE:  ' + this.Player.score, config.textStyle);
        this.bulletsText = scene.add.text(config.width - 550, 10, '', config.textStyle);
        this.HPText = scene.add.text(20, 10, '', config.textStyle);
        this.PowerUPText = scene.add.text(20, 30, '', config.textStyle);
        this.HelpText = scene.add.text(50, config.height - 300, '', config.textStyle);
        this.LifeBar = LifeBar.create(scene, 100, 12);
        this.PowerUPWheel = PowerUPWheel.create(scene, player);
        return this;
      },
      setHelpText(text, duration) {
        this.HelpTextDuration = duration;
        this.HelpText.setText(text);
      },
      updateHelpText() {
        if (this.HelpTextDuration > 0) {
          this.HelpTextDuration--;
        } else {
          this.HelpText.setText('');
        }
      },
      addBullets(scene, n) {
        while (n > 0) {
          const bullet = scene.add.sprite(config.width - 380 + this.bullets.length * 35, 21, 'powerup');
          bullet.setScale(0.35, 0.35);
          bullet.play('powerup-ico-appear');
          this.bullets.push(bullet);
          --n;
        }
      },
      removeBullets(n) {
        while (n > 0) {
          const bullet = this.bullets.pop();
          bullet.play('powerup-ico-disappear');
          bullet.on('animationcomplete', function() {
            this.destroy();
          }, bullet);
          --n;
        }
      },
      updateBullets(scene) {
        if (this.Player.getMaxBullets()) {
          this.bulletsText.setText('Bullets: ');
          const num = this.Player.getMaxBullets() - this.Player.bullets.length;
          if (num !== this.LastBulletsValue) {
            if (num > this.LastBulletsValue) {
              this.addBullets(scene, num - this.LastBulletsValue);
            } else {
              this.removeBullets(this.LastBulletsValue - num);
            }
            this.LastBulletsValue = num;
          }
        }
      },
      update(scene) {
        this.scoreText.setText('SCORE:  ' + this.Player.score);
        this.HPText.setText('HP:');
        this.LifeBar.set(this.Player.HP / this.Player.getMaxHP() * 100);
        this.PowerUPWheel.update();
        this.updateBullets(scene);
        this.updateHelpText();
      }
    };
    return newObj.construct(scene, player);
  }
};
export default UIController;
