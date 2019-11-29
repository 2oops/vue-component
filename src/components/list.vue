<template>
  <div class="list">
    <i-form :model="form" :rules="rules">
      <i-form-item label="Name" prop="name">
        <i-input :model="form.name"></i-input>
      </i-form-item>
      <i-form-item label="Email" prop="email">
        <i-input :model="form.email"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
import iForm from './common/form'
import iFromItem from './common/form-item'
import iInput from './common/input'

export default {
  components: { iForm, iFromItem, iInput },
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
  }
}
</script>

<style lang="less">
  .list {
    
  }
</style>