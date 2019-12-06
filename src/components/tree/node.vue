/* tree-node包含4部分
 * 展开和关闭的按钮
 * 多选框
 * 节点内容
 * 递归子节点
*/

<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <i-checkbox
        v-if="showCheckbox"
        :value="data.checked"
        @input="handleCheck"
      ></i-checkbox>
      <span>{{ data.title }}</span>
      <tree-node
        v-if="data.expand"
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
        :show-checkbox="showCheckbox"
      ></tree-node>
    </li>
  </ul>
</template>
<script>
  import iCheckbox from '@/components/common/checkbox';
  import { findComponentUpward } from '@/utils/assist'

  export default {
    name: 'TreeNode',
    components: { iCheckbox },
    props: {
      data: {
        type: Object,
        default () {
          return {};
        }
      },
      showCheckbox: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        tree: findComponentUpward(this, 'Tree')
      }
    },

    methods: {
      handleExpand() {
        //  $set 的用法就是对可响应对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新
        this.$set(this.data, 'expand', this.data.expand)

        if(this.tree) {
          this.tree.emitEvent('on-toggle-expand', this.data)
        }
      },

      handleCheck(checked) {
        this.updateTreeDown(this.data, checked)

        if(this.tree) {
          this.tree.emitEvent('on-check-change', this.data)
        }
      },

      updateTreeDown(data, checked) {
        this.$set(data, 'checked', checked)

        if(data.children && data.children.length) {
          data.children.forEach(item => {
            this.updateTreeDown(item, checked)
          })
        }
      }
    },

    watch: {
      'data-children': {
        handler(data) {
          if(data) {
            const checkedAll = !data.some(item => !item.checked)
            this.$set(this.data, 'checked', checkedAll)
          }
        },
        deep: true
      }
    }
  }
</script>
<style>
  .tree-ul, .tree-li{
    list-style: none;
    padding-left: 10px;
  }
  .tree-expand{
    cursor: pointer;
  }
</style>