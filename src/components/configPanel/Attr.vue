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
        @input="value => setFabricObjectAttr('angle', value)"
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
        @input="value => setFabricObjectAttr('opacity', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import useFabricObjectAttr from '@/hooks/useFarbicObjectAttr'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const attrs = reactive({
  angle: 0,
  opacity: 1
})

const getObjectAttr = (activeObject: fabric.Object) => {
  if (activeObject) {
    attrs.angle = activeObject.angle!
    attrs.opacity = activeObject.opacity!
  }
}

const handleChange = (activeObject: fabric.Object, key: any, value: any) => {
  if (key === 'angle') {
    activeObject.rotate(value)
    canvasEditor.canvas.renderAll()
    return
  }
  activeObject && activeObject.set(key, value)
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
