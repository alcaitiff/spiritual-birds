import Phaser from 'phaser';
const LifeBar = {
  create(scene, x, y) {
    const newObj = {
      construct(scene, x, y) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 300 / 100;
        this.draw();
        scene.add.existing(this.bar);
        return this;
      },
      set(value) {
        this.value = Math.floor(value);
        if (this.value < 0) {
          this.value = 0;
        }
        this.draw();
        return (this.value === 0);
      },

      decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
          this.value = 0;
        }
        this.draw();
        return (this.value === 0);
      },

      draw() {
        this.bar.clear();
        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 304, 28);
        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 300, 24);
        if (this.value < 34) {
          this.bar.fillStyle(0xff0000);
        } else if (this.value < 67) {
          this.bar.fillStyle(0xffaa00);
        } else {
          this.bar.fillStyle(0x00ff00);
        }
        const d = Math.floor(this.p * this.value);
        this.bar.fillRect(this.x + 2, this.y + 2, d, 24);
      }
    };
    return newObj.construct(scene, x, y);
  }
};
export default LifeBar;
