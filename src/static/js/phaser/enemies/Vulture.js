import config from '../config.json';
import GameController from '../GameController';
const Vulture = {
  hp: 1,
  dmg: 2,
  points: 2,
  sounds: {
    death: null
  },
  anims: {
    fly: null,
    fall: null
  },
  initialize(scene) {
    if (!this.sounds.death) {
      this.sounds.death = scene.sound.add('cry_sound', { loop: false });
      this.sounds.death.volume = 0.5;
    }
    if (!this.anims.fly) {
      this.anims.fly = scene.anims.create({
        key: 'flyV',
        frames: scene.anims.generateFrameNumbers('vulture'),
        frameRate: 17,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallV',
        frames: scene.anims.generateFrameNumbers('vulture', { start: 2, end: 5 }),
        frameRate: 17,
        repeat: 2
      });
    }
  },
  create(scene, group) {
    this.initialize(scene);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprite: null,
      hp: this.hp,
      dmg: this.dmg,
      points: this.points,
      dead: false,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 400), 'vulture');
        this.arcadeSprite.setVelocityX(-100 - Math.random() * 350);
        this.arcadeSprite.setVelocityY(0);
        this.arcadeSprite.body.setAllowGravity(false);
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 15;
        this.arcadeSprite.body.offset.y = 15;
        this.arcadeSprite.play('flyV');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        return this;
      },
      bounce() {
        if (this.arcadeSprite && !this.dead) {
          this.arcadeSprite.setVelocityX(+300 + Math.random() * 150);
          setTimeout(
            () => {
              if (this.arcadeSprite && this.arcadeSprite.body && !this.dead) {
                this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
              }
            }, 1000);
        }
      },
      hit(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
          if (!this.dead) {
            this.dead = true;
            this.death();
            return { points: this.points, drop: GameController.dropTypes.PowerUP };
          } else {
            return { points: 0, drop: null };
          }
        } else {
          this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
          return { points: 1, drop: null };
        }
      },
      death() {
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(350);
        this.arcadeSprite.setAngularVelocity(250);
        this.arcadeSprite.play('fallV');
        this.arcadeSprite.flipY = true;
      },
      update() {
        if (!this.arcadeSprite || !this.arcadeSprite.body || this.arcadeSprite.body.x <= 0 || this.arcadeSprite.body.y > config.height) {
          this.arcadeSprite.destroy();
          return null;
        } else {
          return this;
        }
      }
    };
    return newObj.construct(group);
  }
};
export default Vulture;
