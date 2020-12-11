import config from './config.json';
import FB from './FB';
const Player = {
  flyingState: {
    flying: 0,
    planing: 1,
    falling: 2
  },
  bullets: [],
  maxBullets: 3,
  create(scene) {
    scene.myPlayer = scene.physics.add.sprite(20, config.height / 2, 'player');
    scene.anims.create({
      key: 'fly',
      frames: scene.anims.generateFrameNumbers('player'),
      frameRate: 15,
      repeat: -1
    });
    scene.anims.create({
      key: 'fall',
      frames: scene.anims.generateFrameNumbers('player', { start: 7, end: 0 }),
      frameRate: 20,
      repeat: 0
    });
    scene.anims.create({
      key: 'plane',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 7,
      repeat: 2
    });

    scene.myPlayer.flipX = true;
    scene.myPlayer.score = 0;
    scene.myPlayer.death = this.death;
    scene.myPlayer.setActive(true);
    scene.myPlayer.setCollideWorldBounds(true);
    scene.myPlayer.flyingState = this.flyingState.planing;
    scene.myPlayer.bullets = this.bullets;
    scene.myPlayer.maxBullets = this.maxBullets;
    scene.bullets = scene.physics.add.group();
    this.fall(scene);
    scene.input.keyboard.on('keydown-' + 'Q', function() {
      if (this.bullets.length < this.maxBullets) {
        this.bullets.push(FB.create(scene, scene.myPlayer.x, scene.myPlayer.y));
      }
    }, this);
  },
  death(game) {
    game.music.stop();
    game.scene.stop();
    game.scene.launch('Death', { value: game.myPlayer.score });
  },
  update(scene) {
    if (scene.myPlayer && scene.myPlayer.body) {
      if (scene.myPlayer.body.velocity.x > 2) {
        scene.myPlayer.setVelocityX(scene.myPlayer.body.velocity.x - 3);
      } else if (scene.myPlayer.body.velocity.x < 3) {
        scene.myPlayer.setVelocityX(scene.myPlayer.body.velocity.x + 3);
      } else {
        scene.myPlayer.setVelocityX(scene.myPlayer.body.velocity.x + 0);
      }

      if (scene.cursors.left.isDown) {
        scene.myPlayer.setVelocityX(scene.myPlayer.body.velocity.x - 5);
      } else if (scene.cursors.right.isDown) {
        scene.myPlayer.setVelocityX(scene.myPlayer.body.velocity.x + 5);
      }
      if (scene.cursors.down.isDown) {
        this.fall(scene);
        scene.myPlayer.setVelocityY(scene.myPlayer.body.velocity.y + 5);
      } else if (scene.cursors.up.isDown) {
        this.fly(scene);
        scene.myPlayer.setVelocityY(scene.myPlayer.body.velocity.y - 10);
      } else {
        this.plane(scene);
      }
    }
    this.bullets.forEach((element, index) => {
      if (element === null || !element.update(element, scene)) {
        this.bullets.splice(index, 1);
      };
    });
  },
  plane(scene) {
    if (scene.myPlayer.flyingState !== this.flyingState.planing) {
      scene.myPlayer.flyingState = this.flyingState.planing;
      scene.myPlayer.play('plane');
    }
  },
  fall(scene) {
    if (scene.myPlayer.flyingState !== this.flyingState.falling) {
      scene.myPlayer.flyingState = this.flyingState.falling;
      scene.myPlayer.play('fall');
    }
  },
  fly(scene) {
    if (scene.myPlayer.flyingState !== this.flyingState.flying) {
      scene.myPlayer.flyingState = this.flyingState.flying;
      scene.myPlayer.play('fly');
    }
  }
};
export default Player;
