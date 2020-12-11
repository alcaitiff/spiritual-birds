import config from './config.json';
const GrayBird = {
  hp: 2,
  dmg: 1,
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
        key: 'flyG',
        frames: scene.anims.generateFrameNumbers('graybird'),
        frameRate: 20,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fallG',
        frames: scene.anims.generateFrameNumbers('graybird', { start: 3, end: 5 }),
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
      hp: this.hp,
      dmg: this.dmg,
      points: this.points,
      construct(group) {
        this.arcadeSprite = group.create(config.width + 20, Math.random() * config.height, 'graybird');
        this.arcadeSprite.setVelocityX(-300 - Math.random() * 250);
        this.arcadeSprite.setVelocityY(-150 - Math.random() * 100);
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 15;
        this.arcadeSprite.body.offset.y = 15;
        this.arcadeSprite.play('flyG');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.control = this;
        return this;
      },
      bounce() {
        if (this.arcadeSprite) {
          this.arcadeSprite.setVelocityX(+300 + Math.random() * 150);
          this.arcadeSprite.setVelocityY(-100 - Math.random() * 50);
          setTimeout(
            () => {
              if (this.arcadeSprite && this.arcadeSprite.body) {
                this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
                this.arcadeSprite.setVelocityY(-150 - Math.random() * 50);
              }
            }, 1000);
        }
      },
      hit(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
          this.death();
          return this.points;
        } else {
          this.arcadeSprite.setVelocityX(-300 - Math.random() * 150);
          this.arcadeSprite.setVelocityY(-150 - Math.random() * 50);
          return 1;
        }
      },
      death() {
        this.sounds.death.play();
        this.arcadeSprite.setVelocityX(50);
        this.arcadeSprite.setVelocityY(200);
        this.arcadeSprite.setAngularVelocity(200);
        this.arcadeSprite.play('fallG');
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
export default GrayBird;
