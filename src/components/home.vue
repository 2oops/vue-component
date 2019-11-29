<template>
  <div>
    <h2>{{msg}}</h2>
    <h2>{{count}}</h2>
    <i-button size="large" @on-click="handleClick">
      <i slot="icon"> + </i>
      Large
    </i-button>
    <i-button disabled>Disabled</i-button>
    <i-button @click.native="nativeClick">Primary</i-button>
  </div>
</template>

<script>
import store from '@/vuex/store'

import iButton from './common/button'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Hello 2oops'
    }
  },

  created() {
    this.$on("dispatch-msg", this.showMsg)
  },

  components: {
    iButton
  },

  computed: {
    count()  {
      return store.state.count
    }
  },

  mounted() {
    console.log(this.$children[0].$options.name)
  },

  methods: {
    showMsg(msg) {
      console.log(msg)
    },

    handleClick(event) {
      console.log(event)
    },

    nativeClick(event) {
      console.log(event)
    }
  }
}
</script>

