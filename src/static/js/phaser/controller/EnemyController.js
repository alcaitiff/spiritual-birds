import Crow from '../enemies/Crow';
import Woodpecker from '../enemies/Woodpecker';
import Hawk from '../enemies/Hawk';
import Pidgeon from '../enemies/Pidgeon';
import BlueJay from '../enemies/BlueJay';
import OrangeBird from '../enemies/OrangeBird';
const EnemyController = {
  create(scene, player, gameController) {
    const newObj = {
      Types: {
        Crow: {
          min: 0,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Crow.create.bind(Crow)
        },
        Woodpecker: {
          min: 0,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Woodpecker.create.bind(Woodpecker)
        },
        Hawk: {
          min: 0,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Hawk.create.bind(Hawk)
        },
        Pidgeon: {
          min: 1,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Pidgeon.create.bind(Pidgeon)
        },
        BlueJay: {
          min: 0,
          alive: [],
          killed: 0,
          fleed: 0,
          create: BlueJay.create.bind(BlueJay)
        },
        OrangeBird: {
          min: 0,
          alive: [],
          killed: 0,
          fleed: 0,
          create: OrangeBird.create.bind(OrangeBird)
        }
      },
      enemyGroup: null,
      bulletGroup: null,
      player: null,
      construct(scene, player, gameController) {
        this.player = player;
        this.gameController = gameController;
        this.enemyGroup = scene.physics.add.group();
        this.bulletGroup = scene.physics.add.group();
        scene.physics.add.collider(
          player.arcadeSprite,
          this.enemyGroup,
          (player, enemy) => {
            player.control.hit(scene, enemy.control.dmg);
            enemy.control.bounce();
          }
        );
        scene.physics.add.collider(
          player.arcadeSprite,
          this.bulletGroup,
          (player, bullet) => {
            bullet.control.hit(bullet);
            player.control.hit(scene, bullet.control.dmg);
          }
        );
        scene.physics.add.collider(
          player.bulletGroup,
          this.enemyGroup,
          (bullet, enemy) => {
            bullet.control.hit(bullet);
            const hit = enemy.control.hit(bullet.control.dmg);
            if (hit.drop) {
              this.gameController.drop(hit.drop, enemy.body.x, enemy.body.y);
            }
            player.addScore(hit.points);
          }
        );
        return this;
      },
      generate(type) {
        while (type.alive.length < type.min) {
          type.alive.push(type.create(scene, this.enemyGroup, this.bulletGroup));
        }
      },
      updateType(type) {
        type.alive.forEach((element, index) => {
          if (element === null || !element.update()) {
            if (element.hp > 0) {
              type.fleed++;
            } else {
              type.killed++;
            }
            type.alive.splice(index, 1);
          };
        });
      },
      update(scene) {
        Object.values(this.Types).forEach(e => {
          this.generate(e);
          this.updateType(e);
        });
      }
    };
    return newObj.construct(scene, player, gameController);
  }
};
export default EnemyController;
