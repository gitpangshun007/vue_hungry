
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router.config.js'
import Bscroll from 'better-scroll'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

const router=new VueRouter(routerConfig);
/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  render: h => h(App),
  data:{
  	eventHub:new Vue()
  }
}).$mount('#app')
