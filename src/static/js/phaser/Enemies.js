import GrayBird from './GrayBird';
const Enemies = {
  create(scene, player) {
    const newObj = {
      Types: {
        GrayBird: {
          min: 3,
          alive: [],
          killed: 0,
          fleed: 0,
          create: GrayBird.create.bind(GrayBird)
        }
      },
      enemyGroup: null,
      player: null,
      construct(scene, player) {
        this.player = player;
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
            bullet.control.hit();
            const points = enemy.control.hit(bullet.control.dmg, player);
            player.addScore(points);
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
            type.alive.splice(index, 1);
          };
        });
      },
      update(scene) {
        this.generate(this.Types.GrayBird);
        this.updateType(this.Types.GrayBird);
      }
    };
    return newObj.construct(scene, player);
  }
};
export default Enemies;
