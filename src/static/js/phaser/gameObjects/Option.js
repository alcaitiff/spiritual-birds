import FB from './FB';
const Option = {
  bulletGroup: null,
  maxBullets: 0,
  flyingState: null,
  create(scene, player) {
    const newObj = {
      flyingStates: player.flyingStates,
      dmg: 1,
      bullets: [],
      bulletGroup: player.bulletGroup,
      maxBullets: player.maxBullets,
      flyingState: player.flyingState,
      arcadeSprite: null,
      player: this.player,
      powerups: player.powerups,
      construct(scene, player) {
        this.cursors = player.cursors;
        this.player = player;
        this.arcadeSprite = scene.physics.add.sprite(player.arcadeSprite.body.x - 45, player.arcadeSprite.body.y + 60, 'player');
        this.arcadeSprite.flipX = true;
        this.arcadeSprite.setScale(0.7, 0.7);
        this.arcadeSprite.body.height *= 0.5;
        this.arcadeSprite.body.width *= 0.4;
        this.arcadeSprite.body.offset.x = 40;
        this.arcadeSprite.body.offset.y = 10;
        this.arcadeSprite.control = this;
        this.flyingState = player.flyingState;
        this.bulletGroup = player.bulletGroup;
        scene.input.keyboard.on('keydown-' + 'Q', () => {
          if (this.bullets.length < this.getMaxBullets()) {
            this.shoot();
          }
        }, this);
        return this;
      },
      shoot() {
        this.bullets.push(FB.create(scene, this, true));
      },
      getMaxBullets() {
        return this.maxBullets + this.powerups.bullets.value;
      },
      getDMG() {
        return Math.ceil((this.dmg + this.powerups.dmg.value) / 2);
      },
      update() {
        if (this.arcadeSprite && this.arcadeSprite.body) {
          this.fly();
          this.arcadeSprite.setVelocityY(this.player.arcadeSprite.body.velocity.y + Math.random() * 50 - Math.random() * 50);
          this.arcadeSprite.setVelocityX(this.player.arcadeSprite.body.velocity.x + Math.random() * 50 - Math.random() * 50);
        }
        this.bullets.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.bullets.splice(index, 1);
          };
        });
        return this;
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
    return newObj.construct(scene, player);
  }
};
export default Option;
