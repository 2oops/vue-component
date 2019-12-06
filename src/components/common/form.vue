<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'iForm',
  provide() {
    return {
      form: this,
    }
  },
  
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  
  data() {
    return {
      fields: [] // 用来缓存formItem实例
    }
  },

  created() {
    this.$on('on-form-item-add', (field) => {
      if(field) this.fields.push(field)
    })

    this.$on('remove-form-item', (field) => {
      let index = this.fields.indexOf(field)
      if(field.prop) this.fields.splice(index, 1)
    })
  },

  methods: {
    resetFields() {
      this.fields.forEach(field => {
        field.resetField()
      })
    },

    validate(callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
         this.fields.forEach(field => {
           field.validate('', errors => {
             if(errors) {
               valid = false
             }
             if(++count === this.fields.length) {
               resolve(valid)
               if(typeof callback === 'function') {
                 callback(valid)
               }
             }
           })
         })
      })
    }
  }
}
</script>