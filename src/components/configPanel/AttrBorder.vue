<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">边框</h2>
    <div class="box">
      <div class="label">宽度</div>
      <el-slider
        v-model="attrs.strokeWidth"
        :min="1"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="value => handleChange('strokeWidth', value)"
      />
    </div>
    <div class="box">
      <div class="label">颜色</div>
      <el-popover placement="right" :width="320" trigger="click">
        <template #>
          <ColorPicker
            v-model:color="attrs.stroke"
            textColor="#000"
            strawColor="#000"
            @update:color="handleColorUpdate"
          />
        </template>
        <template #reference>
          <div class="color-bar" :style="{ backgroundColor: attrs.stroke }"></div>
        </template>
      </el-popover>
    </div>
    <div class="box">
      <div class="label">样式</div>
      <el-select
        v-model="attrs.strokeDashArray"
        placeholder="边框样式"
        style="width: 220px"
        @change="changeBorder"
      >
        <el-option
          v-for="item in strokeDashList"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, inject, onMounted, onBeforeUnmount } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'
import ColorPicker from '@/components/ColorPicker.vue'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!
const canvasEvent = inject('canvasEvent') as CanvasEvent

const attrs = reactive({
  stroke: '#fff',
  strokeWidth: 1,
  strokeDashArray: []
})

const strokeDashList = [
  {
    value: {
      strokeUniform: true,
      strokeDashArray: [],
      strokeLineCap: 'butt'
    },
    label: '实线'
  },
  {
    value: {
      strokeUniform: true,
      strokeDashArray: [15, 15],
      strokeLineCap: 'square'
    },
    label: '虚线'
  }
]

const getObjectAttr = (e?: fabric.Object[]) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  // 不是当前obj，则跳过
  if (e && e.length > 0 && e[0] !== activeObject) return
  if (activeObject) {
    attrs.stroke = activeObject.get('stroke') as string
    attrs.strokeWidth = activeObject.get('strokeWidth') as number
    if (!attrs.stroke) {
      attrs.stroke = '#fff'
    }
    const strokeDashArray = JSON.stringify(activeObject.get('strokeDashArray') || [])
    const target = strokeDashList.find(item => {
      return (
        JSON.stringify(item.value.strokeDashArray) === strokeDashArray &&
        activeObject.get('strokeLineCap') === item.value.strokeLineCap
      )
    })
    if (target) {
      // @ts-ignore
      attrs.strokeDashArray = target.label
    }
  }
}

const handleChange = (key: any, value: any) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  if (activeObject) {
    activeObject.set(key, value)
    activeObject.set('strokeUniform', true)
    canvasEditor.canvas.renderAll()
  }
}

const handleColorUpdate = (color: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  attrs.stroke = color
  if (activeObject) {
    activeObject.set('stroke', color)
    activeObject.set('strokeUniform', true)
    canvasEditor.canvas.renderAll()
  }
  canvasEditor.canvas.renderAll()
}

const changeBorder = (val: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  if (activeObject) {
    const stroke = strokeDashList.find(item => item.label === val)!
    activeObject.set(stroke.value)
    canvasEditor.canvas.renderAll()
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
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
