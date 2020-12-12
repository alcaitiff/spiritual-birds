import config from './config.json';
const PowerUp = {
  sounds: {
    appear: null,
    hit: null
  },
  anims: {
    PowerUp: null
  },
  initialize(scene) {
    if (!this.sounds.appear) {
      this.sounds.appear = scene.sound.add('power_up_appear_sound', { loop: false });
      this.sounds.appear.volume = 0.7;
    }
    if (!this.sounds.hit) {
      this.sounds.hit = scene.sound.add('power_up_hit_sound', { loop: false });
      this.sounds.hit.volume = 0.7;
    }
    if (!this.anims.PowerUP) {
      scene.anims.create({
        key: 'powerup',
        frames: scene.anims.generateFrameNumbers('powerup'),
        frameRate: 25,
        repeat: -1
      });
    }
  },
  create(scene, player) {
    this.initialize(scene);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprite: null,
      dmg: 1,
      construct(player) {
        this.arcadeSprite = player.bulletGroup.create(player.arcadeSprite.x + 20, player.arcadeSprite.y - 20, 'fb');
        this.arcadeSprite.setVelocityX(600);
        this.arcadeSprite.setVelocityY(0);
        this.arcadeSprite.play('fb');
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        this.sounds.shoot.play();
        return this;
      },
      update() {
        if (!this.arcadeSprite || !this.arcadeSprite.body || this.arcadeSprite.body.x > config.width + 30) {
          this.arcadeSprite.destroy();
          return null;
        } else {
          this.arcadeSprite.setVelocityY(0);
          return this;
        }
      },
      hit() {
        this.sounds.hit.play();
        this.arcadeSprite.destroy();
      }
    };
    return newObj.construct(player);
  }
};
export default PowerUp;
