<template>
  <div class="custom-header">
    <div class="custom-header-left">
      <img
        data-v-f5e5c200
        src="https://si.geilicdn.com/img-31b500000167f8f458160a217216-unadjust_45_24.png"
        alt="logo"
        class="logo"
      />
      <i
        @click="isCollapse = !isCollapse"
        :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        style="color: #fff"
      ></i>
    </div>

    <header-menu class="custom-header-center" style="flex: 1"></header-menu>
    <user-info class="custom-header-right"></user-info>
  </div>
</template>

<script lang="ts">
import UserInfo from './user-info.vue'
import HeaderMenu from './header-menu.vue'
import { defineComponent, ref, Ref, computed, onMounted } from 'vue'

export default defineComponent({
  components: { UserInfo, HeaderMenu },
  props: {
    collapse: {
      default: () => false,
      type: Boolean
    }
  },
  setup(props, ctx) {
    const isCollapse: Ref<Boolean> = computed({
      get: () => {
        return props.collapse
      },
      set: (val) => {
        ctx.emit('update:collapse', val)
      }
    })

    return { isCollapse }
  }
})
</script>
<style lang="less" scoped>
.custom-header {
  background-color: #001529;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  .custom-header-left,
  .custom-header-right {
    display: flex;
    align-items: center;
    width: 190px;
    justify-content: space-between;
    .fullscreen-icon {
      cursor: pointer;
      transition: all 0.5s;
      color: #fff;
      font-size: 20px;
      transform: rotate(45deg);
    }
    .fullscreen-icon:hover {
      transform: rotate(315deg);
    }
  }
  .custom-header-right {
    margin-right: 20px;
    justify-content: flex-end;
    .user-info-box {
      cursor: pointer;
      display: flex;
      align-items: center;
      .user-img {
        margin-right: 10px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }
    }
  }
}
</style>
