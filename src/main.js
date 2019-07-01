// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(ElementUI)


//拦截登录功能
// router.beforeEach((to, from, next) => {
//   if(to.path == '/login'){
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login'){
//      next({path:'/login'}) 
//   }else{
//     if(from.path == '/login'){
//       next();
//     }else{
//       next({path:'/login'}) 
//     }
//   }
// })





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
