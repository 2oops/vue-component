import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Emitter from '@/components/parent'
import List from '@/components/list'
import Error from '@/components/error'
import Alert from '@/components/alert'
import Table from '@/components/table'
import TableSlot from '@/components/table-slot'
// import Dynamic from '@/components/dynamic'

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
      path: '/table-slot',
      name: 'TableSlot',
      component: TableSlot
    },
    {
      path: '/dynamic',
      name: 'Dynamic',
      component: () => import('@/components/dynamic')
    },
    {
      path: '/dynamic-all',
      name: 'DynamicAll',
      component: () => import('@/components/dynamic-all')
    },
    {
      path: '/tree',
      name: 'Tree',
      component: () => import('@/components/tree')
    },
    {
      path: '*',
      component: Error
    },
  ]
})
