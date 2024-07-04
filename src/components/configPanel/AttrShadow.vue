<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">阴影</h2>
    <div class="box">
      <div class="label">半径</div>
      <el-slider
        v-model="attts.shadow.blur"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="handleChange"
      />
    </div>
    <div class="box">
      <div class="label">水平</div>
      <el-slider
        v-model="attts.shadow.offsetX"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="handleChange"
      />
    </div>
    <div class="box">
      <div class="label">垂直</div>
      <el-slider
        v-model="attts.shadow.offsetY"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="handleChange"
      />
    </div>
    <div class="box">
      <div class="label">颜色</div>
      <el-popover placement="right" :width="320" trigger="click">
        <template #>
          <ColorPicker
            v-model:color="attts.shadow.color"
            textColor="#000"
            strawColor="#000"
            @update:color="handleColorUpdate"
          />
        </template>
        <template #reference>
          <div class="color-bar" :style="{ backgroundColor: attts.shadow.color }"></div>
        </template>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'
import { fabric } from 'fabric'
import ColorPicker from '@/components/ColorPicker.vue'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!
const canvasEvent = inject('canvasEvent') as CanvasEvent

const attts = reactive({
  shadow: {
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000000'
  }
})

const getObjectAttr = (e?: fabric.Object[]) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  // 不是当前obj，则跳过
  if (e && e.length > 0 && e[0] !== activeObject) return
  if (activeObject) {
    // @ts-ignore
    attts.shadow = activeObject.get('shadow') || {}
    if (!attts.shadow.color) {
      attts.shadow.color = '#000000'
    }
  }
}

const handleChange = () => {
  const activeObject = editorStore.getActiveObjects()[0]
  if (activeObject) {
    activeObject.set('shadow', new fabric.Shadow(attts.shadow))
    canvasEditor.canvas.renderAll()
  }
}

const handleColorUpdate = (color: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  attts.shadow.color = color
  activeObject && activeObject.set('shadow', new fabric.Shadow(attts.shadow))
  canvasEditor.canvas.renderAll()
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

.color-bar {
  margin-top: 5px;
  width: 220px;
  height: 30px;
  cursor: pointer;
}
</style>
