<template>
  <!-- 递归组件 -->
  <el-submenu v-if="route && route.children && route.children.length > 0" :index="route.name">
    <i v-if="route.meta.menuIcon" :class="route.meta.menuIcon"></i>
    <template #title>
      <span>{{ route.meta.menuName }}</span>
    </template>
    <template v-for="childRoute in route.children" :key="childRoute.name">
      <menu-items :route="childRoute"> </menu-items>
    </template>
  </el-submenu>
  <el-menu-item v-else-if="route && route.meta && route.meta.link" index>
    <i v-if="route.meta.menuIcon" :class="route.meta.menuIcon"></i
    ><template #title>
      <a :target="route.meta.target" class="link-dom" :href="route.meta.link">{{
        route.meta.menuName
      }}</a>
    </template>
  </el-menu-item>
  <el-menu-item v-else-if="route && route.path" :index="route.path">
    <i v-if="route.meta.menuIcon" :class="route.meta.menuIcon"></i
    ><template #title>
      <span>{{ route.meta.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    route: {
      default: () => ({}),
      type: Object
    }
  },
  setup() {}
})
</script>
<style lang="less" scoped></style>
