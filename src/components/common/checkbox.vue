<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :value="label"
        v-model="model"
        :disabled="disabled"
        @change="change">
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change">
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from '@/mixins/emitter'

import { findComponentUpward } from '@/utils/assist'

export default {
  name: "iCheckbox",
  mixins: [ Emitter ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: false 
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },

  data() {
    return {
      currentValue: this.value,
      parent: null,
      group: false,
      model: []
    }
  },

  mounted() {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')

    if(this.parent) {
      this.group = true
    }
    if(this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },

  methods: {
    change(event) {
      if(this.disabled) {
        return false
      }

      const checked = event.target.checked
      this.currentValue = checked

      const value = checked ? this.trueValue : this.falseValue

      this.$emit('input', value)
      
      if(this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('iFormItem', 'on-form-change', value)
      }
    },

    updateModel() {
      this.currentValue = this.value === this.trueValue
    }
  },

  watch: {
    // 由内而外实现的v-model，通过点击会通知到使用者，但是使用者手动修改prop的value是没有响应的，故补充watch
    value(val) {
      if(val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue or falseValue'
      }
    }
  }
}
</script>