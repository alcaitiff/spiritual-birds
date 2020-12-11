import config from './config.json';
const FB = {
  create(scene, x, y) {
    const me = scene.bullets.create(x + 20, y - 20, 'fb');
    scene.anims.create({
      key: 'fb',
      frames: scene.anims.generateFrameNumbers('fb'),
      frameRate: 25,
      repeat: -1
    });
    me.update = this.update;
    me.setVelocityX(600);
    me.setVelocityY(0);
    me.play('fb');
    me.setActive(true);
    return me;
  },
  update(me, scene) {
    if (!me || !me.body || me.body.x > config.width + 30) {
      me.destroy();
      return null;
    } else {
      me.setVelocityY(0);
      return me;
    }
  }
};
export default FB;
