import Vue from 'vue'
import App from './App.vue'
import './store/store'
import VueRouter from 'vue-router'
import './styles/main.css';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(VueRouter)

Vue.config.productionTip = false;

const messages = {
  en: {
    message: {
      emtpyTips: 'Please add your first todo item!',
      searchTips: 'Please input your search key',
      inputTaskTips: 'Please type your task title'
    }
  },
  zh: {
    message: {
      emtpyTips: "快来添加你的第一个待办事项吧！",
      searchTips: "检索任务关键字",
      inputTaskTips: "输入任务"
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages
})

new Vue({
  render: h => h(App),
  data : {
     seen : true,
  },
  i18n
}).$mount('#app');
