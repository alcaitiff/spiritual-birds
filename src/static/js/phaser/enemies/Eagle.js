import config from '../config.json';
import GameController from '../controller/GameController';
import DropController from '../controller/DropController';
const Eagle = {
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
      hp: 5,
      dmg: 5,
      dropTable: [
        {
          type: GameController.dropTypes.Heal,
          chance: 20
        },
        {
          type: GameController.dropTypes.PowerUP,
          chance: 50
        }
      ],
      dropController: DropController.create(),
      points: 10,
      dead: false,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 500), 'eagle');
        this.arcadeSprite.setVelocityX(-100 - Math.random() * 150);
        this.arcadeSprite.setVelocityY(-100 - Math.random() * 150);
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
            this.death();
            return { points: this.points, drop: this.dropController.calcDrop(this.dropTable) };
          } else {
            return { points: 0, drop: null };
          }
        } else {
          this.arcadeSprite.angle -= 5;
          this.arcadeSprite.setVelocityX(-100 - Math.random() * 150);
          return { points: 1, drop: null };
        }
      },
      death() {
        this.dead = true;
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(350);
        this.arcadeSprite.setAngularVelocity(300);
        this.arcadeSprite.play('fallE');
        this.arcadeSprite.flipY = true;
      },
      update() {
        if (!this.dead) {
          if (this.arcadeSprite.body.velocity.y > 0) {
            if (Math.round(this.arcadeSprite.angle) > -40) {
              this.arcadeSprite.angle -= 5;
            } else if (Math.round(this.arcadeSprite.angle) <= -40) {
              this.arcadeSprite.setVelocityY(400);
              this.arcadeSprite.setVelocityX(-400);
              this.arcadeSprite.play('diveE');
            }
          } else {
            this.arcadeSprite.angle = 40;
          }
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
export default Eagle;
