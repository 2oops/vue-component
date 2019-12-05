<template>
  <div>
    组件 A
  </div>
</template>
<script>
  export default {
    created() {
      console.log('created')
    },
    
    beforeDestroy() {
      console.log('destroy')
    },
  }
</script>