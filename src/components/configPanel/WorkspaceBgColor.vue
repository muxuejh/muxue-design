<template>
  <div class="config-item">
    <h2 class="title">画布颜色</h2>
    <ColorPicker v-model:color="workspaceBgColor" @update:color="handleUpdateColor" />
    <div class="color-list">
      <div
        class="color-item"
        v-for="(color, index) in colorList"
        :key="index"
        :style="{
          backgroundColor: color,
          border: color === '#ffffff' ? '1px solid #ccc' : 'none'
        }"
        @click="setColor(color)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import ColorPicker from '@/components/ColorPicker.vue'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const colorList = ref([
  '#e02020',
  '#fa6401',
  '#f7b500',
  '#6dd400',
  '#44d7b6',
  '#32c5ff',
  '#0091ff',
  '#6236ff',
  '#b729e0',
  '#c3bef0',
  '#ffd3b5',
  '#dcedc2',
  '#f73859',
  '#5e63b6',
  '#a7ff83',
  '#f6f6f6',
  '#bfbfbf',
  '#7f7f7f',
  '#52616b',
  '#000000',
  '#ffffff'
])
const workspaceBgColor = ref('#FFFFFF')

const handleUpdateColor = (val: string) => {
  workspaceBgColor.value = val
  setColor(workspaceBgColor.value)
}

const setColor = (color: string) => {
  workspaceBgColor.value = color
  const workspace = canvasEditor.canvas.getObjects().find(obj => obj.id === 'workspace')
  workspace?.set('fill', color)
  canvasEditor.canvas.renderAll()
}
</script>

<style scoped lang="scss">
.color-list {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .color-item {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
