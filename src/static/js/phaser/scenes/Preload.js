const Preload = {
  key: 'Preload',
  preload() {
    // load all assets tile sprites
    this.load.image('bg_1', 'assets/sky_1.png');
    this.load.image('bg_2', 'assets/decor_2.png');
    this.load.image('bg_3', 'assets/middle_3.png');
    this.load.image('bg_4', 'assets/foreground_4.png');
    this.load.image('ground', 'assets/ground_5.png');

    this.load.audio('bg_sound', 'assets/music/MagicScout-Farm.mp3');

    this.load.spritesheet('player', 'assets/sparrow-sprite-small.png', {
      frameWidth: 100,
      frameHeight: 71
    });
    this.load.spritesheet('graybird', 'assets/graybird-sprite-3.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('fb', 'assets/fireball-small.png', {
      frameWidth: 40,
      frameHeight: 25
    });
  },
  init() {
  },
  create() {
    this.scene.start('Main');
  },
  update() { }
};
export default Preload;
