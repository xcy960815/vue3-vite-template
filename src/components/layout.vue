<template>
  <el-container class="layout-main">
    <el-header class="layout-header">
      <layout-header v-model:collapse="isCollapse"></layout-header>
    </el-header>
    <el-container class="layout-body">
      <el-aside :style="{ width: !isCollapse ? '200px' : '64px' }" class="layout-aside">
        <layout-menu :is-collapse="isCollapse"></layout-menu>
      </el-aside>
      <el-main class="layout-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import LayoutMenu from './menu/menu.vue'
import LayoutHeader from './header/layout-header.vue'
export default defineComponent({
  components: { LayoutMenu, LayoutHeader },
  setup() {
    const isCollapse: Ref<Boolean> = ref(false)
    return { isCollapse }
  }
})
</script>
<style lang="less" scoped>
.layout-main {
  height: 100%;
  width: 100%;
  .layout-header {
    height: 52px;
    padding: 0;
    background-color: #ccc;
  }
  .layout-body {
    display: flex;
    overflow: hidden;
    .layout-aside {
      width: 200px;
      // background: #090090;
      transition: all 0.4s ease 0s;
    }
    .layout-content {
      --el-main-padding: 10px;
      padding: var(--el-main-padding);
      overflow-y: auto;
      flex: 1;
    }
  }
}
</style>
