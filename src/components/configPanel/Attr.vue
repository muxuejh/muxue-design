<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <div class="box">
      <div class="label">旋转</div>
      <el-slider
        v-model="attrs.angle"
        :min="0"
        :max="360"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="value => handleChange('angle', value)"
      />
    </div>
    <div class="box">
      <div class="label">透明</div>
      <el-slider
        v-model="attrs.opacity"
        :min="0"
        :max="1"
        :step="0.1"
        show-input
        :show-input-controls="false"
        @input="value => handleChange('opacity', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!
const canvasEvent = inject('canvasEvent') as CanvasEvent

const attrs = reactive({
  angle: 0,
  opacity: 1
})

const getObjectAttr = (e?: fabric.Object[]) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  // 不是当前obj，则跳过
  if (e && e.length > 0 && e[0] !== activeObject) return
  if (activeObject) {
    attrs.angle = activeObject.angle!
    attrs.opacity = activeObject.opacity!
  }
}

const handleChange = (key: any, value: any) => {
  const activeObject = editorStore.getActiveObjects()[0]
  if (key === 'angle') {
    activeObject.rotate(value)
    canvasEditor.canvas.renderAll()
    return
  }
  activeObject && activeObject.set(key, value)
  canvasEditor.canvas.renderAll()

  getObjectAttr()
}

onMounted(() => {
  canvasEvent.on('selectOne', getObjectAttr)
  canvasEvent.on('objectModified', getObjectAttr)
})

onBeforeUnmount(() => {
  canvasEvent.off('selectOne', getObjectAttr)
  canvasEvent.off('objectModified', getObjectAttr)
})
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
