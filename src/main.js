import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'
import VueAxios from 'vue-axios'
// import axios from 'axios'
import axios from './http'
import animate from 'animate.css'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './element-variables.scss'
import './assets/iconfont/iconfont.css'

Vue.use(animate)
Vue.use(ElementUI,{locale})
Vue.use(VueAxios, axios)
Vue.prototype.$axios=axios 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
// // 页面刷新时，重新赋值有没登录
// if (window.localStorage.getItem('isLogin')=="true") {
//   store.commit('setIsLogin', window.localStorage.getItem('isLogin'));
//   store.commit('saveUser',true);
// }

// router.beforeEach((to, from, next) => {
//   window.document.title = to.meta.title;
//   console.log(to.meta.title)
//   if (to.matched.some(r => r.meta.requiresAuth)) {  // 判断该路由是否需要登录权限
//     console.log(store.getters.isLogin);
//     if (store.getters.isLogin == "true") {  // 通过vuex 如果当前有登录
//       next();
//     }else {
//       console.log("没有登录吖")
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   }
//   else {
//     next();
//   }
// });