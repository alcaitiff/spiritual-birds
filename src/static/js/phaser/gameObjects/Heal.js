import config from '../config.json';
const Heal = {
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
    if (!this.sounds.appear) {
      this.sounds.appear = scene.sound.add('heal_appear_sound', { loop: false });
      this.sounds.appear.volume = 0.7;
    }
    if (!this.sounds.hit) {
      this.sounds.hit = scene.sound.add('heal_hit_sound', { loop: false });
      this.sounds.hit.volume = 0.7;
    }
    if (!this.anims.appear) {
      this.anims.appear = scene.anims.create({
        key: 'heal-appear',
        frames: scene.anims.generateFrameNumbers('heal', { start: 0, end: 8 }),
        frameRate: 20,
        repeat: 0
      });
    }
    if (!this.anims.idle) {
      this.anims.appear = scene.anims.create({
        key: 'heal-idle',
        frames: scene.anims.generateFrameNumbers('heal', { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
      });
    }
    if (!this.anims.hit) {
      this.anims.hit = scene.anims.create({
        key: 'heal-hit',
        frames: scene.anims.generateFrameNumbers('heal', { start: 8, end: 14 }),
        frameRate: 25,
        repeat: 0
      });
    }
    this.group = scene.physics.add.group();
    scene.physics.add.collider(
      player.arcadeSprite,
      this.group,
      (player, heal) => {
        player.control.heal();
        heal.control.hit();
      }
    );
  },
  create(scene, player, x, y, vel) {
    this.initialize(scene, player);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprite: null,
      group: this.group,
      dmg: 1,
      vel: vel,
      construct(x, y, vel) {
        this.sounds.appear.play();
        this.arcadeSprite = this.group.create(x, y, 'heal');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.setVelocityX(vel.x);
        this.arcadeSprite.setVelocityY(vel.y);
        this.arcadeSprite.setScale(0.8, 0.8);
        this.arcadeSprite.body.height *= 0.4;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.play('heal-appear');
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        this.arcadeSprite.on('animationcomplete', function(anim, frame) {
          this.emit('animationcomplete-' + anim.key, anim, frame);
        }, this.arcadeSprite);
        this.arcadeSprite.on('animationcomplete-heal-appear', function(anim, frame) {
          this.play('heal-idle');
        }, this.arcadeSprite);
        return this;
      },
      update() {
        if (!this.arcadeSprite || !this.arcadeSprite.body || this.arcadeSprite.body.x > config.width + 30 || this.arcadeSprite.body.x < 10) {
          this.arcadeSprite.destroy();
          return null;
        } else {
          this.arcadeSprite.setVelocityX(this.vel.x);
          this.arcadeSprite.setVelocityY(this.vel.y);
          return this;
        }
      },
      hit() {
        this.sounds.hit.play();
        this.arcadeSprite.play('heal-hit');
        this.arcadeSprite.body.enable = false;
        this.arcadeSprite.on('animationcomplete-heal-hit', function(anim, frame) {
          this.destroy();
        }, this.arcadeSprite);
      }
    };
    return newObj.construct(x, y, vel);
  }
};
export default Heal;
