import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Emitter from '@/components/parent'
import List from '@/components/list'
import Error from '@/components/error'
import Alert from '@/components/alert'
import Table from '@/components/table'

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
      path: '/alert',
      name: 'Alert',
      component: Alert
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '*',
      component: Error
    },
  ]
})
