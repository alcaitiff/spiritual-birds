const Preload = {
  key: 'Preload',
  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });

    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function(value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 2 - 155, height / 2 - 20, 300 * value, 35);
    });

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    this.load.on('complete', function() {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    // load all assets tile sprites
    this.load.image('bg_1', 'assets/parallax/lvl1/sky.png');
    this.load.image('bg_2', 'assets/parallax/lvl1/decor.png');
    this.load.image('bg_3', 'assets/parallax/lvl1/middle.png');
    this.load.image('bg_4', 'assets/parallax/lvl1/foreground.png');
    this.load.image('ground', 'assets/parallax/lvl1/ground.png');
    this.load.image('logo', 'assets/logo.png');
    this.load.image('ammo', 'assets/ammo.png');
    this.load.image('dmg', 'assets/dmg.png');
    this.load.image('health', 'assets/health.png');
    this.load.image('spread', 'assets/spread.png');
    this.load.image('speed', 'assets/speed.png');
    this.load.image('option', 'assets/option.png');
    this.load.image('ammo_d', 'assets/ammo_d.png');
    this.load.image('dmg_d', 'assets/dmg_d.png');
    this.load.image('health_d', 'assets/health_d.png');
    this.load.image('spread_d', 'assets/spread_d.png');
    this.load.image('speed_d', 'assets/speed_d.png');
    this.load.image('option_d', 'assets/option_d.png');
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
      frameWidth: 250,
      frameHeight: 178
    });

    this.load.spritesheet('crow', 'assets/sprites/crow.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('woodpecker', 'assets/sprites/woodpecker.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('hawk', 'assets/sprites/hawk.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('bluejay', 'assets/sprites/bluejay.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('orangebird', 'assets/sprites/orangebird.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('pidgeon', 'assets/sprites/pidgeon.png', {
      frameWidth: 200,
      frameHeight: 200
    });

    this.load.spritesheet('fb', 'assets/sprites/fireball.png', {
      frameWidth: 512,
      frameHeight: 512
    });

    this.load.spritesheet('gb', 'assets/sprites/ghostball.png', {
      frameWidth: 512,
      frameHeight: 512
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
