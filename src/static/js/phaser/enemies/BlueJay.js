import config from '../config.json';
import GameController from '../controller/GameController';
import DropController from '../controller/DropController';
import GB from '../gameObjects/GB';
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
        frames: scene.anims.generateFrameNumbers('bluejay', { start: 0, end: 7 }),
        frameRate: 18,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallB',
        frames: scene.anims.generateFrameNumbers('bluejay', { start: 2, end: 5 }),
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
      hp: 3,
      dmg: 3,
      bullets: [],
      points: 3,
      spread: 2,
      shootInterval: 250,
      lastShoot: 225,
      dropTable: [
        {
          type: GameController.dropTypes.Heal,
          chance: 70
        },
        {
          type: GameController.dropTypes.PowerUP,
          chance: 50
        }
      ],
      dropController: DropController.create(),
      dead: false,
      bulletGroup: bulletGroup,
      scene: scene,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * (config.height - 200) + 200, 'bluejay');
        this.arcadeSprite.setVelocityX(-200 - Math.random() * 50);
        this.arcadeSprite.setVelocityY(-Math.random() * 50);
        this.arcadeSprite.body.setAllowGravity(false);
        this.arcadeSprite.setScale(0.75, 0.75);
        this.arcadeSprite.body.setSize(this.arcadeSprite.body.width * 0.4, this.arcadeSprite.body.height * 0.4);
        this.arcadeSprite.body.setOffset(40, 45);
        this.arcadeSprite.play('flyB');
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
          this.lastShoot++;
        }
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
          this.arcadeSprite.setVelocityX(-100 - Math.random() * 50);
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
          this.arcadeSprite.setVelocityY(10 + Math.round(Math.cos(this.arcadeSprite.body.x / 36) * 150));
          this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x - Math.round(Math.sin(this.arcadeSprite.body.x / 36) * 5));
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
export default Bluebird;
