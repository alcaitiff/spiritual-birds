import config from './config.json';
import LifeBar from './LifeBar';

const UIController = {
  anims: {
    powerupAppear: null,
    powerupDisappear: null
  },
  bullets: [],
  initialize(scene, player) {
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
    this.initialize(scene, player);
    const newObj = {
      anims: this.anims,
      Player: player,
      Enemies: null,
      PowerUps: [],
      scoreText: null,
      HPText: null,
      LifeBar: null,
      LastBulletsValue: 0,
      bullets: this.bullets,
      construct(scene, player) {
        this.Player = player;
        this.scoreText = scene.add.text(config.width / 2 - 20, 10, 'SCORE:  ' + this.Player.score);
        this.bulletsText = scene.add.text(config.width - 250, 10, '');
        this.HPText = scene.add.text(20, 10, '');
        this.PowerUPText = scene.add.text(20, 30, '');
        this.LifeBar = LifeBar.create(scene, 50, 10);
        return this;
      },
      addBullets(scene, n) {
        while (n > 0) {
          const bullet = scene.add.sprite(config.width - 160 + this.bullets.length * 17, 17, 'powerup');
          // const bullet = scene.add.sprite(config.width - 180, 'powerup');
          bullet.setScale(0.17, 0.17);
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
        if (this.Player.maxBullets) {
          this.bulletsText.setText('Bullets: ');
          const num = this.Player.maxBullets - this.Player.bullets.length;
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
        this.LifeBar.set(this.Player.HP / this.Player.maxHP * 100);
        this.PowerUPText.setText('PWR: ' + this.Player.powerups.stored);
        this.updateBullets(scene);
      }
    };
    return newObj.construct(scene, player);
  }
};
export default UIController;
