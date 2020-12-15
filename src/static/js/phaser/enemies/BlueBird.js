import config from '../config.json';
import GameController from '../controller/GameController';
import DropController from '../controller/DropController';
const Bluebird = {
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
        key: 'flyB',
        frames: scene.anims.generateFrameNumbers('bluebird', { start: 0, end: 7 }),
        frameRate: 18,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallB',
        frames: scene.anims.generateFrameNumbers('bluebird', { start: 2, end: 5 }),
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
      hp: 3,
      dmg: 3,
      points: 3,
      dropTable: [
        {
          type: GameController.dropTypes.Heal,
          chance: 50
        },
        {
          type: GameController.dropTypes.PowerUP,
          chance: 50
        }
      ],
      dropController: DropController.create(),
      dead: false,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 200) + 200, 'bluebird');
        this.arcadeSprite.setVelocityX(-100 - Math.random() * 50);
        this.arcadeSprite.setVelocityY(-Math.random() * 50);
        this.arcadeSprite.body.setAllowGravity(false);
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 15;
        this.arcadeSprite.body.offset.y = 15;
        this.arcadeSprite.play('flyB');
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
                this.arcadeSprite.setVelocityX(-Math.random() * 50);
              }
            }, 1500);
        }
      },
      hit(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
          if (!this.dead) {
            this.death();
            return { points: this.points, drop: this.dropController.calcDrop(this.dropTable) };
          } else {
            return { points: 0, drop: null };
          }
        } else {
          this.arcadeSprite.setVelocityX(-Math.random() * 50);
          return { points: 1, drop: null };
        }
      },
      death() {
        this.dead = true;
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(450);
        this.arcadeSprite.setAngularVelocity(300);
        this.arcadeSprite.play('fallB');
        this.arcadeSprite.flipY = true;
      },
      update() {
        if (!this.dead) {
          this.arcadeSprite.setVelocityY(Math.round(Math.cos(this.arcadeSprite.body.x / 36) * 150));
          this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x - Math.round(Math.sin(this.arcadeSprite.body.x / 36) * 5));
        }
        if (
          !this.arcadeSprite || !this.arcadeSprite.body || this.arcadeSprite.body.x <= 0 ||
           this.arcadeSprite.body.y > config.height - 10 || this.arcadeSprite.body.y < -200
        ) {
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
export default Bluebird;
