<template>
  <div class="switch" :style="positionStyle" @click="toggleCollapse">
    <el-icon color="#ccc">
      <ArrowLeftBold v-if="target === 'sidebar'" />
      <ArrowRightBold v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useAppStore from '@/stores/modules/app'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'

const props = defineProps({
  target: {
    type: String,
    required: true
  }
})

const positionStyle = computed(() => {
  let style = { right: '', borderRadius: '', left: '' }
  if (props.target === 'sidebar') {
    style.right = '-18px'
    style.borderRadius = '0 10px 10px 0'
  } else if (props.target === 'configPanel') {
    style.left = '-18px'
    style.borderRadius = '10px 0 0 10px'
  }

  return style
})

const appStore = useAppStore()
const toggleCollapse = () => {
  if (props.target === 'sidebar') {
    appStore.toggleMenuContentCollapse()
  } else if (props.target === 'configPanel') {
    appStore.toggleConfigPanelCillspse()
  }
}
</script>

<style scoped lang="scss">
.switch {
  position: absolute;
  top: calc(50% - 50px);
  // right: -18px;
  z-index: 999;
  width: 18px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $sub-content-bg;
  // border-radius: 0 10px 10px 0;
  cursor: pointer;
}
</style>
