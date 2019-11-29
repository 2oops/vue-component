<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter'

import AsyncValidator from 'async-validator'

export default {
  name: 'iFormItem',
  inject: ['form'],
  mixins: [ Emitter ],

  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },

  data() {
    return {
      validateState: '', // 校验状态
      validateMessage: '' // 校验信息
    }
  },

  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop]
    }
  },

  created() {
    this.setRules()
  },

  mounted() {
    if(this.prop) {
      // 子组件分发
      this.dispatch('iForm', 'on-form-item-add', this)
    }  
  },

  methods: {
    setRules() {
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },

    onFieldBlur() {
      this.validate('blur')
    },

    /* trigger 校验类型
      callback 毁掉函数
    */
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger)

      if(!rules || rules.length === 0) {
        return true
      }
      this.validateState = 'validating'

      // async-validator库的调用方法
      let descriptor = {}
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      let model = {}

      model[this.prop] = this.fieldValue

      validator.validate(model, { firstFields: true }, error => {
        this.validateState = !error ? 'success' : 'error'
        this.validateMessage = error ? error[0].message : ''

        callback(this.validateMessage)
      })
    },

    // 过滤出符合要求的blur和change 
    getFilteredRule(trigger) {
      const rules = this.getRules()
      
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },

    getRules() {
      let formRules = this.form.rules
      // 判断对应的prop是否有些rules
      formRules = formRules ? formRules[this.prop] : []

      return [].concat(formRules || [])
    },

    onFieldChange() {
      this.validate('change')
    }
  },

  beforeDestroy() {
    // 组件销毁时将实例从form中移除
    tis.dispatch('iFrom', 'remove-form-item', this)
  }
}
</script>