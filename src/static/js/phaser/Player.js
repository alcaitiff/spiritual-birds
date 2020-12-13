import config from './config.json';
import FB from './FB';
const Player = {
  flyingStates: {
    flying: 0,
    planing: 1,
    falling: 2
  },
  HP: 3,
  maxHP: 3,
  powerups: {
    stored: 0,
    velocity: 0,
    bullets: 0,
    dmg: 0,
    spread: 0,
    options: 0
  },
  bullets: [],
  bulletGroup: null,
  maxBullets: 0,
  flyingState: 1,
  score: 0,
  sounds: {
    death: null,
    cry: null
  },
  anims: {
    fly: null,
    fall: null,
    plane: null
  },
  cursors: null,
  initialize(scene) {
    if (!this.sounds.death) {
      this.sounds.death = scene.sound.add('player_death_sound', { loop: false });
      this.sounds.death.volume = 0.7;
    }
    if (!this.sounds.cry) {
      this.sounds.cry = scene.sound.add('player_hit_sound', { loop: false });
      this.sounds.cry.volume = 0.7;
    }
    if (!this.anims.fly) {
      this.anims.fly = scene.anims.create({
        key: 'fly',
        frames: scene.anims.generateFrameNumbers('player'),
        frameRate: 15,
        repeat: -1
      });
    }
    if (!this.anims.fall) {
      this.anims.fall = scene.anims.create({
        key: 'fall',
        frames: scene.anims.generateFrameNumbers('player', { start: 7, end: 0 }),
        frameRate: 20,
        repeat: 0
      });
    }
    if (!this.anims.plane) {
      this.anims.plane = scene.anims.create({
        key: 'plane',
        frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
        frameRate: 7,
        repeat: 2
      });
    }
  },
  create(scene, cursors) {
    this.initialize(scene);
    const newObj = {
      flyingStates: this.flyingStates,
      HP: this.HP,
      powerups: this.powerups,
      maxHP: this.maxHP,
      bullets: this.bullets,
      bulletGroup: this.bulletGroup,
      maxBullets: this.maxBullets,
      flyingState: this.flyingState,
      score: this.score,
      sounds: this.sounds,
      anims: this.anims,
      cursors: null,
      arcadeSprite: null,
      construct(scene, cursors) {
        this.cursors = cursors;
        this.arcadeSprite = scene.physics.add.sprite(20, config.height / 2, 'player');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 40;
        this.arcadeSprite.body.offset.y = 10;
        this.arcadeSprite.control = this;
        this.arcadeSprite.setActive(true);
        this.arcadeSprite.setCollideWorldBounds(true);
        this.score = 0;
        this.flyingState = this.flyingStates.planing;
        this.bulletGroup = scene.physics.add.group();
        this.fall();
        scene.input.keyboard.on('keydown-' + 'Q', () => {
          if (this.bullets.length < this.maxBullets) {
            this.bullets.push(FB.create(scene, this));
          }
        }, this);
        return this;
      },
      powerup() {
        if (this.maxBullets === 0) {
          this.maxBullets = 1;
        } else {
          this.powerups.stored += 1;
        }
      },
      heal() {
        if (this.HP < this.maxHP) {
          this.HP++;
        }
      },
      hit(game, dmg) {
        this.HP -= dmg;
        this.sounds.cry.play();
        if (this.HP <= 0) {
          this.death(game);
        }
      },
      death(game) {
        game.BG.music.stop();
        this.sounds.death.play();
        game.scene.stop();
        game.scene.launch('GameOver', { value: this.score });
      },
      addScore(value) {
        this.score += value;
      },
      update() {
        if (this.arcadeSprite && this.arcadeSprite.body) {
          if (this.arcadeSprite.body.velocity.x > 2) {
            this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x - 3);
          } else if (this.arcadeSprite.body.velocity.x < 3) {
            this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x + 3);
          } else {
            this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x + 0);
          }

          if (this.cursors.left.isDown) {
            this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x - 5);
          } else if (this.cursors.right.isDown) {
            this.arcadeSprite.setVelocityX(this.arcadeSprite.body.velocity.x + 5);
          }
          if (this.cursors.down.isDown) {
            this.fall();
            this.arcadeSprite.setVelocityY(this.arcadeSprite.body.velocity.y + 5);
          } else if (this.cursors.up.isDown) {
            this.fly();
            this.arcadeSprite.setVelocityY(this.arcadeSprite.body.velocity.y - 10);
          } else {
            this.plane();
          }
        }
        this.bullets.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.bullets.splice(index, 1);
          };
        });
      },
      plane() {
        if (this.flyingState !== this.flyingStates.planing) {
          this.flyingState = this.flyingStates.planing;
          this.arcadeSprite.play('plane');
        }
      },
      fall() {
        if (this.flyingState !== this.flyingStates.falling) {
          this.flyingState = this.flyingStates.falling;
          this.arcadeSprite.play('fall');
        }
      },
      fly() {
        if (this.flyingState !== this.flyingStates.flying) {
          this.flyingState = this.flyingStates.flying;
          this.arcadeSprite.play('fly');
        }
      }
    };
    return newObj.construct(scene, cursors);
  }
};
export default Player;
