<template>
  <div class="sidebar-container">
    <div class="menu"></div>
    <div class="menu-content" :class="appStore.isMenuContentCollapse ? 'hidden' : ''"></div>
    <MenuSwitch target="sidebar" />
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import MenuSwitch from '@/components/MenuSwitch.vue'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
.sidebar-container {
  position: relative;
  display: flex;
  height: 100%;
  .menu {
    position: relative;
    width: $sidebar-menu-width;
    height: 100%;
    background: $sidebar-menu-bg;
    border-right: 1px solid #ebeef5;
  }

  .menu-content {
    width: $sidebar-menu-content-width;
    background: $sub-content-bg;
    border-right: 1px solid #ebeef5;
    transition: all 0.3s;
  }
}
</style>
