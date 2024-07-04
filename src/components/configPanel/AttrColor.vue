<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">颜色</h2>
    <el-popover placement="right" :width="320" trigger="click">
      <template #>
        <ColorPicker
          v-model:color="fontColor"
          textColor="#000"
          strawColor="#000"
          @update:color="handleColorUpdate"
        />
      </template>
      <template #reference>
        <div class="color-bar" :style="{ backgroundColor: fontColor }"></div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject } from 'vue'
import ColorPicker from '@/components/ColorPicker.vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!
const canvasEvent = inject('canvasEvent') as CanvasEvent

const fontColor = ref('#000000')

const handleColorUpdate = (color: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  activeObject && activeObject.set('fill', color)
  canvasEditor.canvas.renderAll()
}

const getObjectAttr = (e?: fabric.Object[]) => {
  const activeObject = canvasEditor.canvas.getActiveObject()

  // 不是当前obj，则跳过
  if (e && e.length > 0 && e[0] !== activeObject) return

  if (activeObject) {
    fontColor.value = activeObject.fill as string
  }
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
.color-bar {
  width: 100%;
  height: 35px;
  cursor: pointer;
}
</style>
