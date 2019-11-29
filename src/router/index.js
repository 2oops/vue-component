import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Emitter from '@/components/parent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/emitter',
      name: 'Emitter',
      component: Emitter
    }
  ]
})
