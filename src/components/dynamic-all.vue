<template>
  <div>
    <button @click="handleChange('A')">显示 A 组件</button>
    <button @click="handleChange('B')">显示 B 组件</button>
    <button @click="handleChange('C')">显示 C 组件</button>
    <!-- exclude include max-->
    <keep-alive :max="2">
      <component :is="component"></component>
    </keep-alive>
  </div>
</template>
<script>
  import componentA from '@/components/dynamic-a.vue';
  import componentB from '@/components/dynamic-b.vue';
  import componentC from '@/components/dynamic-c.vue';

  export default {
    data () {
      return {
        component: componentA
      }
    },
    methods: {
      handleChange (component) {
        if (component === 'A') {
          this.component = componentA;
        } else if (component === 'B') {
          this.component = componentB;
        } else if (component === 'C') {
          this.component = componentC;
        }
      }
    }
  }
</script>