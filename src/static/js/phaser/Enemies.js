import GrayBird from './enemies/GrayBird';
import Vulture from './enemies/Vulture';
import Eagle from './enemies/Eagle';
import Pidgeon from './enemies/Pidgeon';
const Enemies = {
  create(scene, player, gameController) {
    const newObj = {
      Types: {
        GrayBird: {
          min: 1,
          alive: [],
          killed: 0,
          fleed: 0,
          create: GrayBird.create.bind(GrayBird)
        },
        Vulture: {
          min: 1,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Vulture.create.bind(Vulture)
        },
        Eagle: {
          min: 1,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Eagle.create.bind(Eagle)
        },
        Pidgeon: {
          min: 1,
          alive: [],
          killed: 0,
          fleed: 0,
          create: Pidgeon.create.bind(Pidgeon)
        }
      },
      enemyGroup: null,
      player: null,
      construct(scene, player, gameController) {
        this.player = player;
        this.gameController = gameController;
        this.enemyGroup = scene.physics.add.group();
        scene.physics.add.collider(
          player.arcadeSprite,
          this.enemyGroup,
          (player, enemy) => {
            player.control.hit(scene, enemy.control.dmg);
            enemy.control.bounce();
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
          type.alive.push(type.create(scene, this.enemyGroup));
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
export default Enemies;
