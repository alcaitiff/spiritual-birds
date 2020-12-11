import Vue from 'vue';
import App from './App.vue';
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/ion-\w*/];

defineIonPhaser(window);

new Vue({
  render: h => h(App)
}).$mount('#app');
