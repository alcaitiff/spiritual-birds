import config from '../config.json';
const FB = {
  sounds: {
    hit: null,
    shoot: null
  },
  anims: {
    fb: null
  },
  initialize(scene) {
    if (!this.sounds.shoot) {
      this.sounds.shoot = scene.sound.add('fireball_sound', { loop: false });
      this.sounds.shoot.volume = 0.5;
    }
    if (!this.sounds.hit) {
      this.sounds.hit = scene.sound.add('fire_hit_sound', { loop: false });
      this.sounds.hit.volume = 0.05;
    }
    if (!this.anims.fb) {
      this.anims.fb = scene.anims.create({
        key: 'gb',
        frames: scene.anims.generateFrameNumbers('gb'),
        frameRate: 20,
        repeat: -1
      });
    }
  },
  create(scene, enemy, small) {
    this.initialize(scene);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprites: [],
      dmg: enemy.dmg,
      small: small,
      enemy: enemy,
      scene: scene,
      construct() {
        if (this.enemy.spread >= 0) {
          this.createBullets(this.enemy.spread);
          this.sounds.shoot.play();
        }
        return this;
      },
      createBullets(spread) {
        if (spread > 9) { this.bullet(250, 20); }
        if (spread > 8) { this.bullet(-250, -20); }
        if (spread > 7) { this.bullet(-200, -20); }
        if (spread > 6) { this.bullet(200, 20); }
        if (spread > 5) { this.bullet(-150, -20); }
        if (spread > 4) { this.bullet(150, 20); }
        if (spread > 3) { this.bullet(-100, -20); }
        if (spread > 2) { this.bullet(100, 20); }
        if (spread > 1) { this.bullet(-50, -20); }
        if (spread > 0) { this.bullet(50, 20); }
        if (spread === 0) { this.bullet(0, 0); }
      },
      bullet(vy, py) {
        if (this.enemy.arcadeSprite && this.enemy.bulletGroup && this.scene) {
          try {
            const arcadeSprite = this.enemy.bulletGroup.create(this.enemy.arcadeSprite.x - 60, this.enemy.arcadeSprite.y - 20 + py, 'gb');
            if (this.small) {
              arcadeSprite.setScale(0.06, 0.06);
            } else {
              arcadeSprite.setScale(0.13, 0.13);
            }
            arcadeSprite.flipX = true;
            arcadeSprite.setVelocityX(this.enemy.arcadeSprite.body.velocity.x - 200);
            arcadeSprite.setVelocityY(vy);
            arcadeSprite.body.setAllowGravity(false);
            arcadeSprite.body.setSize(arcadeSprite.body.width * 0.4, arcadeSprite.body.height * 0.5);
            arcadeSprite.body.setOffset(100, 100);
            arcadeSprite.play('gb');
            arcadeSprite.setActive(true);
            arcadeSprite.control = this;
            this.arcadeSprites.push(arcadeSprite);
          } catch (e) {
            // no problem
          }
        }
      },
      update() {
        this.arcadeSprites.forEach((element, index, array) => {
          if (!element || !element.body || element.body.x > config.width + 30) {
            array.splice(index, 1);
            element.destroy();
            return null;
          }
        });
        return this.arcadeSprites.length ? this : null;
      },
      hit(arcadeSprite) {
        this.sounds.hit.play();
        arcadeSprite.destroy();
      }
    };
    return newObj.construct(enemy);
  }
};
export default FB;
