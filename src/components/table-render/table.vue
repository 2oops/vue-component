<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, index) in columns" :key="index">
          <!-- 如果columns某一列设置了render则通过render.js完成自定义更新 -->
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render'

export default {
  components: { Render },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {

    }
  }
}
</script>

<style lang="less">
  @th-td-padding: 8px 16px;
  @th-td-border: 1px solid #e9e9e9;

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e9e9e9;
    empty-cells: show;
    border-spacing: 1;

    th {
      background: #f7f7f7;
      color: #5c6b77;
      font-weight: 700;
      white-space: nowrap;
      padding: @th-td-padding;
      border: @th-td-border;
    }

    td {
      padding: @th-td-padding;
      border: @th-td-border;
    }
  }
</style>