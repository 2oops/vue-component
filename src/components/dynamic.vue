<template>
  <div>
    <my-component :count="count + 1" v-if="count < 5"></my-component>
  </div>
</template>

<script>

// 实现一个递归组件的必要条件：要给组件设置name，且要有一个明确的结束条件

  export default {
    name: 'my-component',
    props: {
      count: {
        type: Number,
        default: 1
      }
    }
  }
</script>