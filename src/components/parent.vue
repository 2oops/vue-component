<template>
  <div>
    <button @click="handleClick">点击广播事件</button>
    <Child />
    <Child />
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'

import Child from './child'

export default {
  name: "parent",
  mixins: [Emitter],

  components: {
    Child
  },

  methods: {
    handleClick() {
      this.broadcast('child', 'broadcast-msg', 'This is a broadcast message')
    }
  }
}
</script>