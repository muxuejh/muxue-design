<template>
  <div>
    <el-divider content-position="left">基础元素</el-divider>
    <div class="element-wrap">
      <div class="element" @click="addRect()" :draggable="true" @dragend="handleDragend('rect')">
        <svg
          t="1650855811131"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="18499"
          width="26"
          height="26"
        >
          <path
            d="M864 896H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h704a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zM192 832h640V192H192v640z"
            p-id="18500"
          ></path>
        </svg>
      </div>
      <div
        class="element"
        @click="addCircle()"
        :draggable="true"
        @dragend="handleDragend('circle')"
      >
        <svg
          t="1650855860236"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="19440"
          width="26"
          height="26"
        >
          <path
            d="M512 928C282.624 928 96 741.376 96 512S282.624 96 512 96s416 186.624 416 416-186.624 416-416 416z m0-768C317.92 160 160 317.92 160 512s157.92 352 352 352 352-157.92 352-352S706.08 160 512 160z"
            p-id="19441"
          ></path>
        </svg>
      </div>
      <div
        class="element"
        @click="addTriangle()"
        :draggable="true"
        @dragend="handleDragend('triangle')"
      >
        <svg
          t="1650874633978"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2032"
          width="26"
          height="26"
        >
          <path
            d="M928.64 896a2.144 2.144 0 0 1-0.64 0H96a32.032 32.032 0 0 1-27.552-48.288l416-704c11.488-19.456 43.552-19.456 55.104 0l413.152 699.2A31.936 31.936 0 0 1 928.64 896zM152.064 832h719.84L512 222.912 152.064 832z"
            p-id="2033"
          ></path>
        </svg>
      </div>
      <div
        class="element"
        @click="addPolygon()"
        :draggable="true"
        @dragend="handleDragend('polygon')"
      >
        <svg
          t="1650874633978"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2032"
          width="26"
          height="26"
        >
          <path
            d="M161.152 398.016l134.016 412.416h433.664l134.016-412.416L512 143.104 161.152 398.08zM512 64l426.048 309.568-162.752 500.864H248.704L85.952 373.568 512 64z"
            p-id="2033"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { fabric } from 'fabric'
import { v4 as uuid } from 'uuid'
import useEditorStore from '@/stores/modules/editor'
import { getPolygonVertices } from '@/utils/polygon'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

// 默认属性
const defaultPosition = { shadow: '', fontFamily: 'arial' }
// 拖拽属性
const dragOption = { left: 0, top: 0 }

const addRect = (option?: fabric.IRectOptions) => {
  const rect = new fabric.Rect({
    ...defaultPosition,
    ...option,
    fill: '#700961',
    width: 400,
    height: 400,
    // originX: 'center',
    // originY: 'center',
    id: uuid(),
    name: '矩形'
  })
  canvasEditor.canvas.add(rect)
  if (!option) {
    canvasEditor.position('center', rect)
  }
  canvasEditor.canvas.setActiveObject(rect)
}

const addCircle = (option?: fabric.ICircleOptions) => {
  const circle = new fabric.Circle({
    ...defaultPosition,
    ...option,
    radius: 150,
    fill: '#ff6f3c',
    id: uuid(),
    name: '圆形'
  })
  canvasEditor.canvas.add(circle)
  if (!option) {
    canvasEditor.position('center', circle)
  }
  canvasEditor.canvas.setActiveObject(circle)
}

const addTriangle = (option?: fabric.ITriangleOptions) => {
  const triangle = new fabric.Triangle({
    ...defaultPosition,
    ...option,
    width: 400,
    height: 400,
    fill: '#f5c7f7',
    id: uuid(),
    name: '三角形'
  })
  canvasEditor.canvas.add(triangle)
  if (!option) {
    canvasEditor.position('center', triangle)
  }
  canvasEditor.canvas.setActiveObject(triangle)
}

const addPolygon = (option?: fabric.IPolylineOptions) => {
  const polygon = new fabric.Polygon(getPolygonVertices(5, 200), {
    ...defaultPosition,
    ...option,
    fill: '#1891ac',
    id: uuid(),
    name: '多边形'
  })
  polygon.set({
    // 创建完设置宽高，不然宽高会变成自动的值
    width: 400,
    height: 400,
    // 关闭偏移
    pathOffset: {
      x: 0,
      y: 0
    }
  })
  canvasEditor.canvas.add(polygon)
  if (!option) {
    canvasEditor.position('center', polygon)
  }
  canvasEditor.canvas.setActiveObject(polygon)
}

const handleDragend = (type: string) => {
  switch (type) {
    case 'rect':
      addRect(dragOption)
      break
    case 'circle':
      addCircle(dragOption)
      break
    case 'triangle':
      addTriangle(dragOption)
      break
    case 'polygon':
      addPolygon(dragOption)
      break
    default:
      break
  }
}

onMounted(() => {
  canvasEditor.canvas.on('drop', opt => {
    // 画布元素距离浏览器左侧和顶部的距离
    const offset = {
      left: canvasEditor.canvas.getSelectionElement().getBoundingClientRect().left,
      top: canvasEditor.canvas.getSelectionElement().getBoundingClientRect().top
    }

    // 鼠标坐标转换成画布的坐标（未经过缩放和平移的坐标）
    const point = {
      x: opt.e.x - offset.left,
      y: opt.e.y - offset.top
    }

    // 转换后的坐标，restorePointerVpt 不受视窗变换的影响
    const pointerVpt = canvasEditor.canvas.restorePointerVpt(point)
    dragOption.left = pointerVpt.x
    dragOption.top = pointerVpt.y
  })
})
</script>

<style scoped lang="scss">
.element-wrap {
  display: flex;
  justify-content: space-around;
  .element {
    flex: 1;
    text-align: center;
    padding: 5px 0;
    background: $sub-bg-color;
    margin-left: 2px;
    cursor: pointer;
    &:hover {
      background: #edf9ff;
      svg {
        fill: #2d8cf0;
      }
    }
  }
}
</style>
