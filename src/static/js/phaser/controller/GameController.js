import Player from '../gameObjects/Player';
import EnemyController from './EnemyController';
import config from '../config.json';
import PowerUp from '../gameObjects/PowerUP';
import Heal from '../gameObjects/Heal';
import UIController from './UIController';
const GameController = {
  dropTypes: {
    Heal: 1,
    PowerUP: 2
  },
  create(scene, cursors) {
    const newObj = {
      Player: null,
      EnemyController: null,
      PowerUps: [],
      Heals: [],
      scoreText: null,
      HPText: null,
      LifeBar: null,
      scene: null,
      dropTypes: this.dropTypes,
      construct(scene, cursors) {
        this.Player = Player.create(scene, cursors);
        this.EnemyController = EnemyController.create(scene, this.Player, this);
        this.UIController = UIController.create(scene, this.Player);
        this.scene = scene;
        return this;
      },
      drop(type, x, y) {
        if (type === this.dropTypes.Heal) {
          this.dropHeal(x, y);
        } else if (type === this.dropTypes.PowerUP) {
          this.dropPowerUP(x, y);
        }
      },
      dropHeal(x, y) {
        this.Heals.push(Heal.create(this.scene, this.Player, x, y, { x: -100, y: 0 }));
      },
      dropPowerUP(x, y) {
        this.PowerUps.push(PowerUp.create(this.scene, this.Player, x, y, { x: -100, y: 0 }));
      },
      updateEnemies() {
        this.EnemyController.update(this.scene);
      },
      updatePowerUps() {
        this.PowerUps.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.PowerUps.splice(index, 1);
          };
        });
      },
      updateHeals() {
        this.Heals.forEach((element, index) => {
          if (element === null || !element.update()) {
            this.Heals.splice(index, 1);
          };
        });
      },
      update(scene) {
        this.Player.update();
        this.updateEnemies();
        this.updatePowerUps();
        this.updateHeals();

        const e = this.EnemyController.Types;
        if (e.Pidgeon.fleed === 0) {
          this.UIController.setHelpText('Use the arrow keys to fly around. \nDon\'t let the evil birds to touch you.', 100);
        }
        if (e.Pidgeon.fleed === 2 && this.PowerUps.length === 0 && this.Player.getMaxBullets() === 0) {
          e.Pidgeon.min = 0;
          this.UIController.setHelpText('Get the spirit fire to powerup. Use "Q" to shoot.', 400);
          this.PowerUps.push(PowerUp.create(scene, this.Player, config.width / 2, config.height / 2, { x: 0, y: 0 }));
        }
        if (e.Pidgeon.fleed === 2 && this.Player.getMaxBullets() > 0) {
          this.UIController.setHelpText('For now you only have one bullet. \nKill a pideon to get more spirit fire.', 400);
          e.Pidgeon.min = 2;
        }
        if (e.Pidgeon.fleed + e.Pidgeon.killed === 10) {
          this.UIController.setHelpText('Use "W" to use your spirit fire and powerup.\nEach powerup is diferent.', 400);
          e.Woodpecker.min = 1;
        }
        if (e.Woodpecker.fleed + e.Woodpecker.killed === 10) {
          this.UIController.setHelpText('The power ups available are speed, ammunition, max HP, spread, damage and helpers.', 400);
          e.Woodpecker.min = 2;
        }
        if (e.Woodpecker.fleed + e.Woodpecker.killed === 20) {
          this.UIController.setHelpText('Some birds can shoot you, and some need more than one shoot to be defeated.', 400);
          e.Woodpecker.min = 1;
          e.Pidgeon.min = 1;
          e.BlueJay.min = 1;
        }
        if (e.Woodpecker.fleed + e.Woodpecker.killed === 30) {
          this.UIController.setHelpText('Increase your life or you can die in one hit to hawks and other strong enemies.', 400);
          e.Woodpecker.min = 1;
          e.Pidgeon.min = 0;
          e.BlueJay.min = 1;
          e.Hawk.min = 1;
        }
        if (e.Woodpecker.fleed + e.Woodpecker.killed === 40) {
          e.Woodpecker.min = 1;
          e.Pidgeon.min = 0;
          e.BlueJay.min = 1;
          e.Hawk.min = 1;
          e.OrangeBird.min = 1;
        }
        if (e.Woodpecker.fleed + e.Woodpecker.killed === 50) {
          e.Woodpecker.min = 0;
          e.Pidgeon.min = 0;
          e.BlueJay.min = 1;
          e.Hawk.min = 1;
          e.OrangeBird.min = 0;
          e.Crow.min = 2;
        }
        if (e.Crow.fleed + e.Crow.killed === 20) {
          e.Woodpecker.min = 1;
          e.Pidgeon.min = 1;
          e.BlueJay.min = 1;
          e.Hawk.min = 1;
          e.OrangeBird.min = 0;
          e.Crow.min = 2;
        }
        if (e.Crow.fleed + e.Crow.killed === 40) {
          e.Woodpecker.min = 2;
          e.Pidgeon.min = 2;
          e.BlueJay.min = 1;
          e.Hawk.min = 1;
          e.OrangeBird.min = 0;
          e.Crow.min = 2;
        }
        if (e.Crow.fleed + e.Crow.killed === 60) {
          e.Woodpecker.min = 2;
          e.Pidgeon.min = 2;
          e.BlueJay.min = 2;
          e.Hawk.min = 2;
          e.OrangeBird.min = 1;
          e.Crow.min = 4;
        }
        this.UIController.update(scene);
      }
    };
    return newObj.construct(scene, cursors);
  }
};
export default GameController;
