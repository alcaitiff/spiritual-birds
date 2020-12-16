import config from '../config.json';
import GameController from '../controller/GameController';
import DropController from '../controller/DropController';
import GB from '../gameObjects/GB';
const Pidgeon = {
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
        key: 'flyP',
        frames: scene.anims.generateFrameNumbers('pidgeon'),
        frameRate: 22,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallP',
        frames: scene.anims.generateFrameNumbers('pidgeon', { start: 2, end: 5 }),
        frameRate: 17,
        repeat: 2
      });
    }
  },
  create(scene, group, bulletGroup) {
    this.initialize(scene);
    const newObj = {
      sounds: this.sounds,
      anims: this.anims,
      arcadeSprite: null,
      hp: 1,
      dmg: 1,
      points: 1,
      dropTable: [
        {
          type: GameController.dropTypes.Heal,
          chance: 15
        },
        {
          type: GameController.dropTypes.PowerUP,
          chance: 60
        }
      ],
      dropController: DropController.create(),
      bullets: [],
      spread: -1,
      shootInterval: 2500,
      lastShoot: 0,
      bulletGroup: bulletGroup,
      dead: false,
      scene: scene,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 100), 'pidgeon');
        this.arcadeSprite.setVelocityX(-250 - Math.random() * 50);
        this.arcadeSprite.setVelocityY(-Math.random() * 150);
        this.arcadeSprite.setScale(0.7, 0.7);
        this.arcadeSprite.body.setSize(this.arcadeSprite.body.width * 0.6, this.arcadeSprite.body.height * 0.4);
        this.arcadeSprite.body.setOffset(25, 45);
        this.arcadeSprite.play('flyP');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        return this;
      },
      shoot() {
        if (!this.dead && this.arcadeSprite && this.scene && this.lastShoot === this.shootInterval) {
          this.bullets.push(GB.create(this.scene, this, false));
          this.lastShoot = 0;
        } else {
          // console.log(this.lastShoot);
          // console.log(!this.dead+' &&'+ this.arcadeSprite+' &&'+ this.scene+' &&'+  this.lastShoot === this.shootInterval
          this.lastShoot++;
        }
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
          this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
          return { points: 1, drop: null };
        }
      },
      death() {
        this.dead = true;
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(350);
        this.arcadeSprite.setAngularVelocity(300);
        this.arcadeSprite.play('fallP');
        this.arcadeSprite.flipY = true;
      },
      update() {
        if (!this.dead) {
          this.arcadeSprite.setVelocityY(Math.round(Math.cos(this.arcadeSprite.body.x / 36) * 150));
          this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x - Math.round(Math.sin(this.arcadeSprite.body.x / 36) * 10));
          this.shoot();
        }
        this.bullets.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.bullets.splice(index, 1);
          };
        });
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
export default Pidgeon;
