import config from '../config.json';

const PowerUPWheel = {
  create(scene, player) {
    const newObj = {
      Player: player,
      sprites: {
        saturated: {},
        desaturated: {}
      },
      lastValue: 0,
      cornerPosX: config.width - 150,
      cornerPosY: config.height - 250,
      cornerOffsetX: 70,
      cornerOffsetY: 40,
      construct(scene, player) {
        this.Player = player;
        this.lastValue = this.Player.powerups.stored.value;
        this.sprites.saturated.speed = scene.add.sprite(this.cornerPosX, this.cornerPosY, 'speed').setDepth(3);
        this.sprites.saturated.ammo = scene.add.sprite(this.cornerPosX + this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY, 'ammo').setDepth(3);
        this.sprites.saturated.health = scene.add.sprite(this.cornerPosX + this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY * 3, 'health').setDepth(3);
        this.sprites.saturated.spread = scene.add.sprite(this.cornerPosX, this.cornerPosY + this.cornerOffsetY * 4, 'spread').setDepth(3);
        this.sprites.saturated.dmg = scene.add.sprite(this.cornerPosX - this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY * 3, 'dmg').setDepth(3);
        this.sprites.saturated.option = scene.add.sprite(this.cornerPosX - this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY, 'option').setDepth(3);

        this.sprites.desaturated.speed_d = scene.add.sprite(this.cornerPosX, this.cornerPosY, 'speed_d').setDepth(4);
        this.sprites.desaturated.ammo_d = scene.add.sprite(this.cornerPosX + this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY, 'ammo_d').setDepth(4);
        this.sprites.desaturated.health_d = scene.add.sprite(this.cornerPosX + this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY * 3, 'health_d').setDepth(4);
        this.sprites.desaturated.spread_d = scene.add.sprite(this.cornerPosX, this.cornerPosY + this.cornerOffsetY * 4, 'spread_d').setDepth(4);
        this.sprites.desaturated.dmg_d = scene.add.sprite(this.cornerPosX - this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY * 3, 'dmg_d').setDepth(4);
        this.sprites.desaturated.option_d = scene.add.sprite(this.cornerPosX - this.cornerOffsetX, this.cornerPosY + this.cornerOffsetY, 'option_d').setDepth(4);

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
