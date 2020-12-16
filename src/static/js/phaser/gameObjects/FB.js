import config from '../config.json';
const FB = {
  sounds: {
    shoot: null,
    hit: null
  },
  anims: {
    fb: null
  },
  initialize(scene) {
    if (!this.sounds.shoot) {
      this.sounds.shoot = scene.sound.add('fireball_sound', { loop: false });
      this.sounds.shoot.volume = 0.7;
    }
    if (!this.sounds.hit) {
      this.sounds.hit = scene.sound.add('fire_hit_sound', { loop: false });
      this.sounds.hit.volume = 0.05;
    }
    if (!this.anims.fb) {
      this.anims.fb = scene.anims.create({
        key: 'fb',
        frames: scene.anims.generateFrameNumbers('fb'),
        frameRate: 25,
        repeat: -1
      });
    }
  },
  create(scene, player, small) {
    this.initialize(scene);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprites: [],
      dmg: 1,
      small: small,
      construct(player) {
        this.createBullets(player.powerups.spread.value);
        this.dmg = player.getDMG();
        this.sounds.shoot.play();
        return this;
      },
      createBullets(spread) {
        if (spread > 9) { this.bullet(150, 20); }
        if (spread > 8) { this.bullet(-150, -20); }
        if (spread > 7) { this.bullet(-100, -20); }
        if (spread > 6) { this.bullet(100, 20); }
        if (spread > 5) { this.bullet(-75, -20); }
        if (spread > 4) { this.bullet(75, 20); }
        if (spread > 3) { this.bullet(-50, -20); }
        if (spread > 2) { this.bullet(50, 20); }
        if (spread > 1) { this.bullet(0, -20); }
        if (spread > 0) { this.bullet(0, 20); }
        this.bullet(0, 0);
      },
      bullet(vy, py) {
        const arcadeSprite = player.bulletGroup.create(player.arcadeSprite.x + 20, player.arcadeSprite.y - 20 + py, 'fb');
        if (this.small) {
          arcadeSprite.setScale(0.6, 0.6);
        } else {
          arcadeSprite.setScale(1.5, 1.5);
        }
        arcadeSprite.setVelocityX(900);
        arcadeSprite.setVelocityY(vy);
        arcadeSprite.body.setAllowGravity(false);
        arcadeSprite.play('fb');
        arcadeSprite.setActive(true);
        arcadeSprite.control = this;
        this.arcadeSprites.push(arcadeSprite);
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
    return newObj.construct(player);
  }
};
export default FB;
