import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Emitter from '@/components/parent'
import List from '@/components/list'
import Error from '@/components/error'

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
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '*',
      component: Error
    },
  ]
})
