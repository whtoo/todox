import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  data : {
     seen : true,
     sharedData : store.state
  }
}).$mount('#app');
