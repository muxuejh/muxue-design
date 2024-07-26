<template>
  <div class="config-item">
    <h2 class="title">画布尺寸</h2>
    <div class="ipt-box">
      <el-input v-model.number="width">
        <template #prefix>宽</template>
      </el-input>
      <el-input v-model.number="height">
        <template #prefix>高</template>
      </el-input>
    </div>
    <el-button style="width: 100%; height: 35px" type="primary" @click="setSize">确定</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { event } from '@/core/event/index'
import useEditorStore from '@/stores/modules/editor'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const defaultSize = { width: 900, height: 1200 }
const width = ref(defaultSize.width)
const height = ref(defaultSize.height)

const setSize = () => {
  // @ts-ignore
  canvasEditor.setSize(width.value, height.value)
}

onMounted(() => {
  event.on('sizeChange', (w, h) => {
    width.value = w
    height.value = h
  })
})
</script>

<style scoped lang="scss">
.ipt-box {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :deep(.el-input) {
    width: 140px;
  }
  :deep(.el-input__wrapper) {
    height: 35px;
  }
  :deep(.el-input__inner) {
    text-align: center;
  }
}
</style>
