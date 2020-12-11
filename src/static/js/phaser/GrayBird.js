import config from './config.json';
const GrayBird = {
  create(scene) {
    const me = scene.enemies.create(config.width + 20, Math.random() * config.height, 'graybird');
    scene.anims.create({
      key: 'flyG',
      frames: scene.anims.generateFrameNumbers('graybird'),
      frameRate: 20,
      repeat: -1
    });

    scene.anims.create({
      key: 'fallG',
      frames: scene.anims.generateFrameNumbers('graybird', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: 0
    });
    me.update = this.update;
    me.setVelocityX(-300 - Math.random() * 250);
    me.setVelocityY(-150 - Math.random() * 100);
    me.play('flyG');
    me.flipX = true;
    me.setActive(true);
    me.death = this.death;
    return me;
  },
  death() {
    this.setVelocityX(40);
    this.setVelocityY(200);
    this.play('fallG');
    this.flipY = true;
  },
  update(me, scene) {
    if (!me || !me.body || me.body.x <= 0 || me.body.y > config.height) {
      me.destroy();
      scene.myPlayer.score += 1;
      return null;
    } else {
      return me;
    }
  }
};
export default GrayBird;
