import config from './config.json';
const Background = {
  music: null,
  initialize(scene) {
    if (!this.music) {
      this.music = scene.sound.add('bg_sound', { loop: true });
      this.music.volume = 0.3;
    }
  },
  create(scene, music) {
    this.initialize(scene);
    const newObj = {
      bg_1: null,
      bg_2: null,
      bg_3: null,
      bg_4: null,
      ground: null,
      music: this.music,
      speed: 1,
      construct(scene, music) {
        this.bg_1 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_1');
        this.bg_1.setOrigin(0, 0);
        this.bg_1.setScrollFactor(0);

        this.bg_2 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_2');
        this.bg_2.setOrigin(0, 0);
        this.bg_2.setScrollFactor(0);

        this.bg_3 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_3');
        this.bg_3.setOrigin(0, 0);
        this.bg_3.setScrollFactor(0);

        this.bg_4 = scene.add.tileSprite(0, 0, config.width, config.height, 'bg_4');
        this.bg_4.setOrigin(0, 0);
        this.bg_4.setScrollFactor(0);

        this.ground = scene.add.tileSprite(0, 0, config.width, config.height, 'ground');
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        this.ground.setDepth(2);

        if (music) {
          this.music.play();
        }
        return this;
      },
      update(speed) {
        const s = speed || this.speed;
        this.bg_1.tilePositionX += 0.2 * s;
        this.bg_2.tilePositionX += 0.4 * s;
        this.bg_3.tilePositionX += 0.6 * s;
        this.bg_4.tilePositionX += 0.8 * s;
        this.ground.tilePositionX += 1 * s;
      }
    };
    return newObj.construct(scene, music);
  }
};
export default Background;
