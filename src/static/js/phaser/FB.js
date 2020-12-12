import config from './config.json';
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
export default FB;
