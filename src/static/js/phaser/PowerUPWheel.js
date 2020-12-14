import config from './config.json';

const PowerUPWheel = {
  create(scene, player) {
    const newObj = {
      Player: player,
      sprites: {
        saturated: {},
        desaturated: {}
      },
      lastValue: 0,
      construct(scene, player) {
        this.Player = player;
        this.lastValue = this.Player.powerups.stored.value;
        this.sprites.saturated.speed = scene.add.sprite(config.width - 80, config.height - 150, 'speed').setDepth(3);
        this.sprites.saturated.ammo = scene.add.sprite(config.width - 80 + 40, config.height - 120, 'ammo').setDepth(3);
        this.sprites.saturated.health = scene.add.sprite(config.width - 80 + 40, config.height - 75, 'health').setDepth(3);
        this.sprites.saturated.spread = scene.add.sprite(config.width - 80, config.height - 50, 'spread').setDepth(3);
        this.sprites.saturated.dmg = scene.add.sprite(config.width - 80 - 40, config.height - 75, 'dmg').setDepth(3);
        this.sprites.saturated.option = scene.add.sprite(config.width - 80 - 40, config.height - 120, 'option').setDepth(3);

        this.sprites.desaturated.speed_d = scene.add.sprite(config.width - 80, config.height - 150, 'speed_d').setDepth(4);
        this.sprites.desaturated.ammo_d = scene.add.sprite(config.width - 80 + 40, config.height - 120, 'ammo_d').setDepth(4);
        this.sprites.desaturated.health_d = scene.add.sprite(config.width - 80 + 40, config.height - 75, 'health_d').setDepth(4);
        this.sprites.desaturated.spread_d = scene.add.sprite(config.width - 80, config.height - 50, 'spread_d').setDepth(4);
        this.sprites.desaturated.dmg_d = scene.add.sprite(config.width - 80 - 40, config.height - 75, 'dmg_d').setDepth(4);
        this.sprites.desaturated.option_d = scene.add.sprite(config.width - 80 - 40, config.height - 120, 'option_d').setDepth(4);

        return this;
      },
      update() {
        if (this.Player.powerups.stored.value !== this.lastValue) {
          if (this.Player.powerups.stored.value) {
            const index = (this.Player.powerups.stored.value - 1) % 6;
            Object.values(this.sprites.saturated)[index].setDepth(5);
          }
          if (this.lastValue) {
            const indexLastValue = (this.lastValue - 1) % 6;
            Object.values(this.sprites.saturated)[indexLastValue].setDepth(3);
          }
        }
        this.lastValue = this.Player.powerups.stored.value;
      }
    };
    return newObj.construct(scene, player);
  }
};
export default PowerUPWheel;
