<template>
  <!--  -->
  <button
    @click="handleClick"
    :class="'i-button-' + size"
    :disabled="disabled">
    <slot name="icon"></slot>
    <slot />
    <!-- <slot>父组件无值时的默认</slot> -->
  </button>
</template>

<script>
import Emitter from '@/mixins/emitter'

function valueIn(value, list) {
  for(let i = 0; i < list.length; i ++) {
    if(value === list[i]) {
      return true
    }
  }

  return false
}

export default {
  name: 'i-button',
  mixins: [Emitter],
  // inheritAttrs: false, // 禁止继承父组件传过来的值，默认为true
  props: {
    size: {
      validator(value) {
        return valueIn(value, ['small', 'large', 'default'])
      },
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    // $on监听子组件本身触发的事件
    this.$on('on-click', text => {
      console.log('>>>', text)
    })
  },

  methods: {
    handleClick(event) {
      console.log('native')
      this.$emit('on-click', event)
      this.dispatch('home', "dispatch-msg", 'this is a dispatch message')
    }
  }
}
</script>

<style>
  .i-button-large {
    color: #ffffff;
    background-color: #4686FF;
    border-radius: 3px;
    padding: 9px 15px;
    font-size: 14px;
    border: 1px solid #dcdfe6;
  }
  .i-button-default {
    color: #ffffff;
    background-color: #4686FF;
    border-radius: 3px;
    padding: 9px 15px;
    font-size: 12px;
    border: 1px solid #dcdfe6;
  }
</style>