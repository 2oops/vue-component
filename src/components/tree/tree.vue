// 组件入口
// 对接收的props：data作初步处理，为了在不破坏使用者传递的源数据,会克隆一份data

<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    />
  </div>
</template>

<script>
import TreeNode from '@/components/tree/node'
import { deepClone } from '@/utils/deep-clone'

export default {
  name: 'Tree',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      cloneData: []
    }
  },

  methods: {
    reorganizeData() {
      this.cloneData = deepClone(this.data)
    },

    emitEvent(eventName, data) {
      this.$emit(eventName, data, this.cloneData)
    }
  },

  watch: {
    data() {
      this.reorganizeData()
    }
  }
}
</script>