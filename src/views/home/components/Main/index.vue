<template>
  <div class="main-container">
    <Sidebar />
    <CanvasEditor />
    <ConfigPanel />
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import CanvasEditor from './components/CanvasEditor/index.vue'
import ConfigPanel from './components/ConfigPanel/index.vue'
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  height: calc(100vh - $header-height);
  display: flex;
  justify-content: space-between;
}
</style>
