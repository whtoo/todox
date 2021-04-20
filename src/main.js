import Vue from 'vue'
import App from './App.vue'
import './store/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  data : {
     seen : true,
  }
}).$mount('#app');
