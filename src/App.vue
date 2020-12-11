<template>
  <div id="app">
    <ion-phaser v-bind:game.prop="game" />
  </div>
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
  margin-top: 0px;
}
</style>
