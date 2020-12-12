import config from './config.json';
const PowerUp = {
  sounds: {
    appear: null,
    hit: null
  },
  anims: {
    appear: null,
    hit: null
  },
  group: null,
  initialize(scene, player) {
    // if (!this.sounds.appear) {
    //   this.sounds.appear = scene.sound.add('power_up_appear_sound', { loop: false });
    //   this.sounds.appear.volume = 0.7;
    // }
    // if (!this.sounds.hit) {
    //   this.sounds.hit = scene.sound.add('power_up_hit_sound', { loop: false });
    //   this.sounds.hit.volume = 0.7;
    // }
    if (!this.anims.appear) {
      this.anims.appear = scene.anims.create({
        key: 'powerup-appear',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: 0
      });
    }
    if (!this.anims.idle) {
      this.anims.appear = scene.anims.create({
        key: 'powerup-idle',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.anims.hit) {
      this.anims.hit = scene.anims.create({
        key: 'powerup-hit',
        frames: scene.anims.generateFrameNumbers('powerup', { start: 8, end: 14 }),
        frameRate: 25,
        repeat: 0
      });
    }
    this.group = scene.physics.add.group();
    scene.physics.add.collider(
      player.arcadeSprite,
      this.group,
      (player, powerup) => {
        player.control.powerup();
        powerup.control.hit();
      }
    );
  },
  create(scene, player, x, y) {
    this.initialize(scene, player);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprite: null,
      group: this.group,
      dmg: 1,
      construct(x, y) {
        this.arcadeSprite = this.group.create(x, y, 'powerup');
        this.arcadeSprite.setVelocityX(0);
        this.arcadeSprite.setVelocityY(0);
        this.arcadeSprite.setScale(0.4, 0.4);
        this.arcadeSprite.body.height *= 0.4;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.play('powerup-appear');
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        // this.sounds.appear.play();
        this.arcadeSprite.on('animationcomplete', function(anim, frame) {
          this.emit('animationcomplete-' + anim.key, anim, frame);
        }, this.arcadeSprite);
        this.arcadeSprite.on('animationcomplete-powerup-appear', function(anim, frame) {
          this.play('powerup-idle');
        }, this.arcadeSprite);
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
        // this.sounds.hit.play();
        this.arcadeSprite.play('powerup-hit');
        this.arcadeSprite.body.enable = false;
        this.arcadeSprite.on('animationcomplete-powerup-hit', function(anim, frame) {
          this.destroy();
        }, this.arcadeSprite);
      }
    };
    return newObj.construct(x, y);
  }
};
export default PowerUp;
