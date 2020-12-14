import config from '../config.json';
import GameController from '../GameController';
const Eagle = {
  hp: 5,
  dmg: 5,
  points: 10,
  sounds: {
    death: null
  },
  anims: {
    fly: null,
    fall: null,
    dive: null
  },
  initialize(scene) {
    if (!this.sounds.death) {
      this.sounds.death = scene.sound.add('cry_sound', { loop: false });
      this.sounds.death.volume = 0.5;
    }
    if (!this.anims.fly) {
      this.anims.fly = scene.anims.create({
        key: 'flyE',
        frames: scene.anims.generateFrameNumbers('eagle'),
        frameRate: 22,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallE',
        frames: scene.anims.generateFrameNumbers('eagle', { start: 2, end: 5 }),
        frameRate: 17,
        repeat: 2
      });
    }
    if (!this.anims.dive) {
      this.anims.dive = scene.anims.create({
        key: 'diveE',
        frames: scene.anims.generateFrameNumbers('eagle', { start: 3, end: 2 }),
        frameRate: 17,
        repeat: 0
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
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 400), 'eagle');
        this.arcadeSprite.setVelocityX(-100 - Math.random() * 150);
        this.arcadeSprite.setVelocityY(-200 - Math.random() * 150);
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 15;
        this.arcadeSprite.body.offset.y = 15;
        this.arcadeSprite.play('flyE');
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
            }, 500);
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
        this.arcadeSprite.setAngularVelocity(300);
        this.arcadeSprite.play('fallE');
        this.arcadeSprite.flipY = true;
      },
      update() {
        if (this.arcadeSprite.body.velocity.y > 0) {
          if (Math.round(this.arcadeSprite.angle) !== -40) {
            this.arcadeSprite.angle = -40;
            this.arcadeSprite.setVelocityY(350);
            this.arcadeSprite.play('diveE');
          }
        } else {
          this.arcadeSprite.angle = 40;
        }
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
export default Eagle;
