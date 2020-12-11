import GrayBird from './GrayBird';
const Enemies = {
  enemies: [],
  numEnemies: 3,
  create(scene) {
    scene.enemies = scene.physics.add.group();
    scene.physics.add.collider(scene.myPlayer, scene.enemies, () => scene.myPlayer.death(scene));
    scene.physics.add.collider(
      scene.bullets,
      scene.enemies,
      (bullet, enemy) => {
        bullet.destroy();
        enemy.death();
      }
    );
  },
  update(scene) {
    while (this.enemies.length < this.numEnemies) {
      this.enemies.push(GrayBird.create(scene));
    }
    this.enemies.forEach((element, index) => {
      if (element === null || !element.update(element, scene)) {
        this.enemies.splice(index, 1);
      };
    });
  }
};
export default Enemies;
