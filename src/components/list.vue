/**
 * 踩坑：input框中使用v-model:而不能使用 :model ，前者是双向绑定，后者是v-bind:model的缩写
*/

<template>
  <div class="list">
    <i-form ref='form' :model="form" :rules="rules">
      <i-form-item label="Name" prop="name">
        <i-input v-model="form.name"></i-input>
      </i-form-item>
      <i-form-item label="Email" prop="email">
        <i-input v-model="form.email"></i-input>
      </i-form-item>
      <i-form-item>
        <i-button size="large" @on-click="submit">提交</i-button>
        <i-button size="large" @on-click="reset">重置</i-button>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import iForm from './common/form'
import iFormItem from './common/form-item'
import iInput from './common/input'
import iButton from './common/button'

export default {
  components: { iForm, iFormItem, iInput, iButton },
  data() {
    return {
      form: {
        name: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: "name can't be empty!", trigger: 'blur'}
        ],
        email: [
          { required: true, message: "email can't be empty!", trigger: 'blur'},
          { type: 'email', message: "email format is incorrect!", trigger: 'blur'}
        ]
      }
    }
  },

  methods: {
    submit() {
      const validate = this.$refs.form.validate()

      // 在iForm组件中没有定义reject因此不能使用catch()
      validate.then((valid) => {
        if(valid) {
          window.alert('successful!')
        } else {
          window.alert('failure!')
        }
      })
    },

    reset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less">

</style>