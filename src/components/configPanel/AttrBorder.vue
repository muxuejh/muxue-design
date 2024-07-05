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
        @input="(value: number) => setFabricObjectAttr('strokeWidth', value)"
      />
    </div>
    <div class="box color-box">
      <div class="label">颜色</div>
      <ColorPicker
        v-model:color="attrs.stroke"
        @update:color="setFabricObjectAttr('stroke', $event.value)"
      />
    </div>
    <div class="box">
      <div class="label">样式</div>
      <el-select
        v-model="attrs.strokeDashArray"
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
import useFabricObjectAttr from '@/hooks/useFarbicObjectAttr'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

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

const getObjectAttr = (activeObject: fabric.Object) => {
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

const handleChange = (activeObject: fabric.Object, key: any, value: any) => {
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

<style scoped lang="scss">
.box {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.color-box {
    justify-content: flex-start;
    .label {
      width: 60px;
    }
  }
}
</style>
