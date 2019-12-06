// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Alert from '@/components/alert/alert'

Vue.config.productionTip = false

Vue.prototype.$Alert = Alert

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const extendComp = Vue.extend({
  template: '<div>{{message}}</div>',
  data() {
    return {
      message: 'hello 2oops'
    }
  }
})
const comp = new extendComp().$mount()
document.body.appendChild(comp.$el)

// new extendComp().$mount('#app') // 此方式会直接覆盖原来的组件，但但不包括扩展的组件

import Error from './components/error'

const props = {}
const Instance = new Vue({
  render(h) {
    return h(Error, {
      props: props
    })
  },
})
const comp1 = Instance.$mount()
document.body.appendChild(comp1.$el)

// 操作render实例
const compInstance = Instance.$children[0]