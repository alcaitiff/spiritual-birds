import GrayBird from './GrayBird';
const Enemies = {
  enemies: [],
  enemyGroup: null,
  numEnemies: 3,
  player: null,
  create(scene, player) {
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
  update(scene) {
    while (this.enemies.length < this.numEnemies) {
      this.enemies.push(GrayBird.create(scene, this.enemyGroup));
    }
    this.enemies.forEach((element, index) => {
      if (element === null || !element.update()) {
        this.enemies.splice(index, 1);
      };
    });
  }
};
export default Enemies;
