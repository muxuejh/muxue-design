<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">位置尺寸</h2>
    <div class="ipt-box">
      <el-input v-model.number="state.left" @change="value => handleChange('left', Number(value))">
        <template #prefix>X</template>
      </el-input>
      <el-input v-model="state.top" @change="value => handleChange('top', Number(value))">
        <template #prefix>Y</template>
      </el-input>
    </div>
    <div class="ipt-box">
      <el-input
        v-model.number="state.width"
        @change="value => handleChange('width', Number(value))"
      >
        <template #prefix>W</template>
      </el-input>
      <el-input v-model="state.height" @change="value => handleChange('height', Number(value))">
        <template #prefix>H</template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, onMounted, onBeforeMount } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

const canvasEvent = inject('canvasEvent') as CanvasEvent
const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const state = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0
})

const getObjectAttr = (e?: fabric.Object[]) => {
  const activeObject = canvasEditor.canvas.getActiveObject()

  // 不是当前obj，则跳过
  if (e && e.length > 0 && e[0] !== activeObject) return

  if (activeObject) {
    state.left = Number(activeObject.get('left')!.toFixed(2))
    state.top = Number(activeObject.get('top')!.toFixed(2))
    state.width = Number((activeObject.get('width')! * activeObject.scaleX!).toFixed(2))
    state.height = Number((activeObject.get('height')! * activeObject.scaleY!).toFixed(2))
  }
}

const handleChange = (key: any, value: number) => {
  const activeObject = editorStore.getActiveObjects()[0]
  activeObject && activeObject.set(key, value)
  canvasEditor.canvas.renderAll()

  getObjectAttr()
}

onMounted(() => {
  canvasEvent.on('selectOne', getObjectAttr)
  canvasEvent.on('objectModified', getObjectAttr)
})

onBeforeMount(() => {
  canvasEvent.off('selectOne', getObjectAttr)
  canvasEvent.off('objectModified', getObjectAttr)
})
</script>

<style scoped lang="scss">
.ipt-box {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
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
