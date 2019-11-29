<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from '@/mixins/emitter'

export default {
  name: 'iInput',
  mixins: [ Emitter ],
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      currentValue: this.value
    }
  },

  methods: {
    handleInput(event) {
      const val = event.target.value
      this.currentValue = val
      this.$emit('input', val)
      this.dispatch('iFormItem', 'on-form-change', val)
    },

    handleBlur() {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue)
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
    }
  }
}
</script>