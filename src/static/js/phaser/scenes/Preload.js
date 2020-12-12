const Preload = {
  key: 'Preload',
  preload() {
    // load all assets tile sprites
    this.load.image('bg_1', 'assets/parallax/lvl1/sky.png');
    this.load.image('bg_2', 'assets/parallax/lvl1/decor.png');
    this.load.image('bg_3', 'assets/parallax/lvl1/middle.png');
    this.load.image('bg_4', 'assets/parallax/lvl1/foreground.png');
    this.load.image('ground', 'assets/parallax/lvl1/ground.png');
    this.load.image('logo', 'assets/logo.png');
    // music
    this.load.audio('bg_sound', 'assets/music/MagicScoutFarm.mp3');
    this.load.audio('start_sound', 'assets/music/MagicScoutManor.mp3');
    // souds
    this.load.audio('fireball_sound', 'assets/sounds/fireball.ogg');
    this.load.audio('player_death_sound', 'assets/sounds/playerdeath.ogg');
    this.load.audio('cry_sound', 'assets/sounds/cry.ogg');
    this.load.audio('fire_hit_sound', 'assets/sounds/firehit.ogg');
    this.load.audio('player_hit_sound', 'assets/sounds/playerhit.ogg');
    this.load.audio('powerup_hit_sound', 'assets/sounds/poweruphit.ogg');
    this.load.audio('powerup_appear_sound', 'assets/sounds/powerupappear.ogg');

    this.load.audio('heal_hit_sound', 'assets/sounds/healhit.ogg');
    this.load.audio('heal_appear_sound', 'assets/sounds/healappear.ogg');

    this.load.spritesheet('player', 'assets/sprites/sparrow.png', {
      frameWidth: 100,
      frameHeight: 71
    });

    this.load.spritesheet('graybird', 'assets/sprites/graybird.png', {
      frameWidth: 64,
      frameHeight: 48
    });

    this.load.spritesheet('fb', 'assets/sprites/fireball.png', {
      frameWidth: 40,
      frameHeight: 25
    });

    this.load.spritesheet('powerup', 'assets/sprites/fire.png', {
      frameWidth: 156,
      frameHeight: 157
    });

    this.load.spritesheet('heal', 'assets/sprites/water.png', {
      frameWidth: 156,
      frameHeight: 157
    });
  },
  init() {
  },
  create() {
    this.scene.start('Start');
  },
  update() { }
};
export default Preload;
