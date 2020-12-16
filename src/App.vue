<template>
  <ion-phaser id="app" v-bind:game.prop="game" />
</template>

<script>
import game from './static/js/phaser/game';
export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      game: game
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
html,
body {
  margin: 0px;
  padding: 0px;
  background: #000000;
}
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
