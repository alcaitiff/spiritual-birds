import config from './config.json';
const Background = {
  create(scene) {
    scene.bg_1 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_1');
    scene.bg_1.setOrigin(0, 0);
    scene.bg_1.setScrollFactor(0);

    scene.bg_2 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_2');
    scene.bg_2.setOrigin(0, 0);
    scene.bg_2.setScrollFactor(0);

    scene.bg_3 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_3');
    scene.bg_3.setOrigin(0, 0);
    scene.bg_3.setScrollFactor(0);

    scene.bg_4 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_4');
    scene.bg_4.setOrigin(0, 0);
    scene.bg_4.setScrollFactor(0);

    scene.ground = scene.add.tileSprite(0, 0, config.width, config.height, 'ground');
    scene.ground.setOrigin(0, 0);
    scene.ground.setScrollFactor(0);
    scene.ground.setDepth(1);

    scene.music = scene.sound.add('bg_sound', { loop: true });
    scene.music.volume = 0.3;
    scene.music.play();
  },
  update(scene) {
    scene.bg_1.tilePositionX += 0.2;
    scene.bg_2.tilePositionX += 0.4;
    scene.bg_3.tilePositionX += 0.6;
    scene.bg_4.tilePositionX += 0.8;
    scene.ground.tilePositionX += 1;
  }
};
export default Background;
