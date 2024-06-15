<template>
  <div class="config-panel-container" :class="appStore.isConfigPanelCillspse ? 'hidden' : ''">
    <MenuSwitch target="configPanel" />
  </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import MenuSwitch from '@/components/MenuSwitch.vue'

const appStore = useAppStore()
</script>

<style scoped lang="scss">
.config-panel-container {
  position: relative;
  width: $config-panel-width;
  height: 100%;
  // padding: 15px;
  background: $sub-content-bg;
  border-left: 1px solid #ebeef5;
  transition: all 0.3s;
}
</style>
