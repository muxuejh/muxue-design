<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <div class="box">
      <div class="label">旋转</div>
      <el-slider
        v-model="objectAttrs.angle"
        :min="0"
        :max="360"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="(value: Number) => setFabricObjectAttr('angle', value)"
      />
    </div>
    <div class="box">
      <div class="label">透明</div>
      <el-slider
        v-model="objectAttrs.opacity"
        :min="0"
        :max="1"
        :step="0.1"
        show-input
        :show-input-controls="false"
        @input="(value: Number) => setFabricObjectAttr('opacity', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const objectAttrs = reactive({
  angle: 0,
  opacity: 1
})

const getObjectAttr = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    objectAttrs.angle = activeObject.angle!
    objectAttrs.opacity = activeObject.opacity!
  }
}

const handleChange = (activeObject: fabric.Object | undefined, key: any, value: any) => {
  if (activeObject) {
    if (key === 'angle') {
      activeObject.rotate(value)
      canvasEditor.canvas.renderAll()
      return
    }
    activeObject.set(key, value)
  }
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
