import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit("login", window.localStorage.getItem('token'))
}

const router= new Router({
  routes,
  mode:"history"
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.token) {
        next();
    }
    else {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    }
  }
  else {
      next();
  }
})

export default router;


