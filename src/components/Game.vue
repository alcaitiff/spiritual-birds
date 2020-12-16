<template>
  <div :id="containerId" />
</template>

<script>
import Phaser from 'phaser';
import game from '@/static/js/phaser/game';

export default {
  name: 'Game',
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'app'
    };
  },
  async mounted() {
    game.parent = this.containerId;
    this.downloaded = true;
    this.$nextTick(() => {
      this.gameInstance = new Phaser.Game(game);
    });
  },
  destroyed() {
    this.gameInstance.destroy(false);
  }
};
</script>

<style scoped>
.placeholder {
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
