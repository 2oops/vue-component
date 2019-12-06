<template>
  <h2>I am child component</h2>
</template>

<script>
import { findComponentUpward } from '@/utils/assist'

export default {
  name: "child",
  created() {
    // 每渲染一次此组件都会收到广播的消息
    this.$on('broadcast-msg', this.showMsg)

    const parentComp = findComponentUpward(this, 'parent')
    console.log(parentComp.$options.name) // parent
  },
  
  methods: {
    showMsg(msg) {
      console.log(msg)
    }
  }
}
</script>