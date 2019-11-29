<template>
  <h2>I am child component</h2>
</template>

<script>
export default {
  name: "child",
  created() {
    // 每渲染一次此组件都会收到广播的消息
    this.$on('broadcast-msg', this.showMsg)
  },
  
  methods: {
    showMsg(msg) {
      console.log(msg)
    }
  }
}
</script>