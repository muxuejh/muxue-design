<template>
  <div
    class="config-item"
    v-if="editorStore.selectMode === 'one' && editorStore.selectType !== 'group'"
  >
    <h2 class="title">边框</h2>
    <div class="attr-box">
      <div class="label">宽度</div>
      <el-slider
        class="content"
        v-model="objectAttrs.strokeWidth"
        :min="1"
        :max="50"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="(value: number) => setFabricObjectAttr('strokeWidth', value)"
      />
    </div>
    <div class="attr-box">
      <div class="label">颜色</div>
      <ColorPicker
        class="content"
        v-model:color="objectAttrs.stroke"
        @update:color="setFabricObjectAttr('stroke', $event)"
      />
    </div>
    <div class="attr-box">
      <div class="label">样式</div>
      <el-select
        class="content"
        v-model="objectAttrs.strokeDashArray"
        placeholder="边框样式"
        style="width: 225px"
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
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import ColorPicker from '@/components/ColorPicker.vue'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const objectAttrs = reactive({
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

const getObjectAttr = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    objectAttrs.stroke = activeObject.get('stroke') as string
    if (activeObject.type === 'path') {
      objectAttrs.strokeWidth = 20
    } else {
      objectAttrs.strokeWidth = activeObject.get('strokeWidth') as number
    }
    if (!objectAttrs.stroke) {
      objectAttrs.stroke = '#fff'
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
      objectAttrs.strokeDashArray = target.label
    }
  }
}

const handleChange = (activeObject: fabric.Object | undefined, key: any, value: any) => {
  if (activeObject) {
    activeObject.set(key, value)
    activeObject.set('strokeUniform', true)
  }
}

const changeBorder = (val: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  if (activeObject) {
    const stroke = strokeDashList.find(item => item.label === val)!
    activeObject.set(stroke.value)
    canvasEditor.canvas.renderAll()
  }
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss"></style>
