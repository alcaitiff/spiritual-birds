import config from '../config.json';
import GameController from '../controller/GameController';
import DropController from '../controller/DropController';
const Crow = {
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
        key: 'flyC',
        frames: scene.anims.generateFrameNumbers('crow'),
        frameRate: 14,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallC',
        frames: scene.anims.generateFrameNumbers('crow', { start: 3, end: 5 }),
        frameRate: 10,
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
      hp: 2,
      dmg: 2,
      points: 5,
      dropTable: [
        {
          type: GameController.dropTypes.Heal,
          chance: 20
        },
        {
          type: GameController.dropTypes.PowerUP,
          chance: 30
        }
      ],
      dropController: DropController.create(),
      dead: false,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * config.height, 'crow');
        this.arcadeSprite.setVelocityX(-300 - Math.random() * 250);
        this.arcadeSprite.setVelocityY(-150 - Math.random() * 100);
        this.arcadeSprite.setScale(0.8, 0.8);
        this.arcadeSprite.body.setSize(this.arcadeSprite.body.width * 0.4, this.arcadeSprite.body.height * 0.4);
        this.arcadeSprite.body.setOffset(35, 45);
        this.arcadeSprite.play('flyC');
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
                this.arcadeSprite.setVelocityY(-150 - Math.random() * 50);
              }
            }, 1000);
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
          this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
          this.arcadeSprite.setVelocityY(-150 - Math.random() * 50);
          return { points: 1, drop: null };
        }
      },
      death() {
        this.dead = true;
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(200);
        this.arcadeSprite.setAngularVelocity(200);
        this.arcadeSprite.play('fallC');
        this.arcadeSprite.flipY = true;
      },
      update() {
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
export default Crow;
