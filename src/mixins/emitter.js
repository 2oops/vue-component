/* broadcast & dispatch ==> 父组件广播，子组件分发
 * 在子组件调用dispatch方法，向上级指定的组件实例触发自定义事件，并传递数据，
 * 且该上级组件已预先通过$on监听了这个事件
 * 
 * 在父组件调用broadcast方法，向下级指定组件实例广播自定义事件，并传递数据，
 * 且该下级已预先通过$on监听了该事件
 */

//  通过遍历匹配组件的name选项来找到组件实例，name主要用于递归组件

function broadcast(componentName, eventName, params) {
  this.$children.forEach( child => {
    const name = child.$options.name
    
    if(name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName, params].concat([params]))
    }
  })
}

export default {
  // methods里定义的方法mixins导入后会被混合到组件中
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      
      while(parent && (!parent || name !== componentName)) {
        parent = parent.$parent

        if(parent) {
          name = parent.$options.name
        }
      }
      if(parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },

    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  },
}