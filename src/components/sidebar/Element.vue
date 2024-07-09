<template>
  <div>
    <h2 class="title">基础元素</h2>
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

    <h2 class="title">画笔</h2>
    <div class="element-wrap">
      <div
        class="element"
        @click="drawingLineModeSwitch('line')"
        :class="{ active: state.lineType === 'line' }"
      >
        <svg
          t="1720430545273"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9026"
          width="20"
          height="20"
        >
          <path
            d="M29.281771 874.038672m60.339778-60.339779l724.077344-724.077344q60.339779-60.339779 120.679558 0l0 0q60.339779 60.339779 0 120.679558l-724.077344 724.077344q-60.339779 60.339779-120.679558 0l0 0q-60.339779-60.339779 0-120.679558Z"
            fill="#000000"
            p-id="9027"
          ></path>
        </svg>
      </div>
      <div
        class="element"
        @click="drawingLineModeSwitch('thinTailArrow')"
        :class="{ active: state.lineType === 'thinTailArrow' }"
      >
        <svg
          t="1715323097309"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="24572"
          width="20"
          height="20"
        >
          <path
            d="M485.954269 735.978673 643.38051 811.107852C688.831327 832.798434 686.17686 860.459274 635.3838 871.903075L81.378406 996.721881C31.19882 1008.027444-1.313538 976.266799 10.130269 925.473745L134.949081 371.468357C146.254656 321.288783 173.611855 317.095036 195.744311 363.471653L270.873453 520.897858 903.670271 62.052983C986.301645 2.136458 1004.805285 20.426857 944.799125 103.181838L485.954269 735.978673Z"
            fill="#000000"
            p-id="24573"
          ></path>
        </svg>
      </div>
      <div
        class="element"
        @click="freeDraw('freeDraw_base')"
        :class="{ active: state.lineType === 'freeDraw_base' }"
      >
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="icon ">
            <path
              id="Vector"
              d="M4.81203 19.9999C4.04264 19.9999 3.20891 19.8757 2.50295 19.6281C0.900741 19.0701 0.0660871 17.9568 0.00174157 16.5312C-0.062604 14.363 1.66921 13.6196 3.01679 13.0625C4.29911 12.5045 5.00507 12.1949 5.00507 11.266C5.00507 10.1509 3.01679 9.22208 2.18306 9.09788C2.03166 9.03797 1.90193 8.93526 1.81041 8.80285C1.71889 8.67044 1.66973 8.51434 1.66921 8.35446C1.73356 8.04485 2.05436 7.79644 2.37517 7.85945C3.52972 8.04485 6.28738 9.22208 6.28738 11.266C6.28738 13.0625 4.74861 13.6817 3.52972 14.1776C2.11871 14.7968 1.22063 15.2306 1.28498 16.5312C1.28498 17.46 1.86225 18.1422 2.8881 18.513C4.55557 19.1322 7.05769 18.6993 7.69931 17.955C7.95577 17.7084 8.34001 17.6463 8.59739 17.8938C8.85385 18.1413 8.91728 18.513 8.66173 18.7614C8.02012 19.5039 6.41607 19.9999 4.81203 19.9999Z"
              fill="currentColor"
            />
            <path
              id="Vector_2"
              d="M8.47348 16.7914C8.90276 17.0344 9.86703 16.8571 10.0233 16.7914L13.6101 15.2587L8.63067 11.7378L8.03961 15.4783C8.03961 15.5908 8.04513 16.5484 8.47348 16.7914ZM18.0711 0.591L9.35226 11.0898L14.1745 14.4964L21.7746 2.78706C22.282 2.09584 21.8693 0.859207 21.1707 0.356994C20.4721 -0.144319 18.5785 -0.16232 18.0711 0.591Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
      <div
        class="element"
        @click="freeDraw('freeDraw_circle')"
        :class="{ active: state.lineType === 'freeDraw_circle' }"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="icon "
            d="M18.9787 3.67624C19.1462 3.67624 19.3695 3.6188 19.4811 3.50392L21.6581 1.78068C22.0488 1.49347 22.1047 0.91906 21.8256 0.574413C21.5465 0.172324 20.9883 0.114882 20.6533 0.402089L18.4764 2.12533C18.0856 2.41253 18.0298 2.98695 18.3089 3.33159C18.4764 3.56136 18.6997 3.67624 18.9787 3.67624ZM20.9324 5.85901H18.9787C18.5322 5.85901 18.1415 6.2611 18.1415 6.72063C18.1415 7.18016 18.5322 7.58225 18.9787 7.58225H20.9324C21.379 7.58225 21.7697 7.18016 21.7697 6.72063C21.7697 6.2611 21.379 5.85901 20.9324 5.85901ZM21.4348 11.6031L19.4811 9.99478C19.0904 9.70757 18.588 9.76501 18.3089 10.1671C18.0298 10.5692 18.0856 11.0862 18.4764 11.3734L20.4301 12.9817C20.5975 13.0966 20.765 13.154 20.9324 13.154C21.1557 13.154 21.4348 13.0392 21.6023 12.8094C21.8814 12.4648 21.8256 11.8903 21.4348 11.6031ZM15.8528 0H12.6711V2.06788H7.98224L6.69838 3.50392H1.33968L0 10.5692H2.67935L0.781478 19.2428C0.502379 20.3916 1.06058 21.5405 2.06533 21.8851C2.23279 21.9426 2.45607 22 2.62353 22C2.90263 22 3.23755 21.9426 3.46083 21.7702C3.90739 21.483 4.29813 21.0235 4.46559 20.4491L8.03806 10.5692H8.93118V16.3133C8.93118 16.7728 9.32192 17.1749 9.76847 17.1749C10.215 17.1749 10.6058 16.7728 10.6058 16.3133V10.5692H12.6711V12.6371H15.9087C16.5785 12.6371 17.1367 12.0052 17.1367 11.3159V1.32115C17.0809 0.574413 16.5227 0 15.8528 0ZM2.06533 8.84595L2.73517 5.22715H7.42404L8.7079 3.73368H12.6153V8.84595H2.06533ZM15.4063 10.9138H14.2899V1.72324H15.4063V10.9138Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>

    <h2 class="title">文字</h2>
    <div class="element-wrap">
      <div class="element" @click="addText">
        <svg
          t="1650875455324"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5401"
          width="26"
          height="26"
        >
          <path
            d="M213.333333 209.92v128h85.333334v-42.666667h170.666666v433.493334H384.853333v85.333333h256v-85.333333H554.666667V295.253333h170.666666v42.666667h85.333334v-128H213.333333z"
            p-id="5402"
          ></path>
        </svg>
      </div>
      <div class="element" @click="addVerticalText">
        <svg
          t="1720509148750"
          class="icon"
          viewBox="0 0 1385 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="15195"
          width="26"
          height="26"
        >
          <path
            d="M926.422392 0.046429H467.722516v189.661155s59.846568-124.289575 140.833661-124.289575h223.151709v792.599462q0 74.873984-28.321494 102.530001c-18.896473 18.432186-102.53 63.452528-102.53 63.452528h451.132001s-83.571623-44.958438-102.53-63.452528-28.321494-52.61917-28.321495-102.530001V65.418009h223.198138c80.940664 0 140.833661 124.289575 140.833661 124.289575V0.046429zM245.886286 839.275761V0H129.133634v839.275761H0l187.50996 184.662334L375.01992 839.275761h-129.133634z"
            fill=""
            p-id="15196"
          ></path>
        </svg>
      </div>
      <!-- <div class="element" @click="addPathText">
        <svg
          t="1720511422395"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="20505"
          width="26"
          height="26"
        >
          <path
            d="M527.067429 214.857143c10.386286 0 19.053714 1.956571 26.002285 5.778286 6.948571 3.894857 12.562286 8.886857 16.841143 14.994285 4.388571 6.290286 8.082286 13.037714 11.008 20.187429l7.753143 19.273143 3.968 10.166857 103.168 251.428571c6.326857 15.634286 9.490286 27.227429 9.490286 34.505143 0 8.100571-3.437714 15.506286-10.477715 22.454857-6.948571 6.893714-15.305143 10.331429-25.142857 10.331429a33.462857 33.462857 0 0 1-14.72-2.962286 28.891429 28.891429 0 0 1-10.130285-8.173714c-2.870857-3.657143-5.979429-9.197714-9.325715-16.64l-8.850285-20.352-18.432-47.817143-2.377143-1.645714h-157.056l-2.377143 1.645714-20.589714 54.4-2.048 5.12-3.894858 9.106286c-3.748571 8.338286-7.094857 14.445714-10.002285 18.230857-4.571429 5.997714-12.16 9.033143-23.003429 9.033143-9.197714 0-17.243429-3.291429-24.283428-9.984-7.094857-6.582857-10.569143-13.970286-10.569143-22.235429 0-4.973714 0.822857-10.112 2.505143-15.36l2.706285-7.789714 1.737143-4.608 115.492572-289.353143c3.163429-7.277714 6.528-13.531429 10.057142-18.706286 4.205714-6.308571 9.801143-11.337143 16.822858-15.250285 6.912-3.84 15.488-5.778286 25.728-5.778286z m-0.036572 77.220571a3.657143 3.657143 0 0 0-1.408 0.859429 7.643429 7.643429 0 0 0-4.717714 4.827428l-48.457143 146.688 2.450286 3.364572h107.52l2.413714-3.382857-49.353143-146.706286-0.749714-1.609143-1.060572-1.353143a7.716571 7.716571 0 0 0-2.925714-1.828571 3.675429 3.675429 0 0 0-3.712-0.859429z m-4.973714 328.045715c108.653714 0 216.649143 39.990857 323.529143 119.168a27.428571 27.428571 0 0 1-32.658286 44.086857c-97.92-72.539429-194.742857-108.397714-290.870857-108.397715-96.146286 0-192.950857 35.858286-290.870857 108.397715a27.428571 27.428571 0 0 1-32.658286-44.068572c106.88-79.177143 214.857143-119.186286 323.529143-119.186285z"
            fill=""
            p-id="20506"
          ></path>
        </svg>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
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

const state = reactive({
  isDrawingLineMode: false,
  lineType: ''
})

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
  canvasEditor.canvas.renderAll()
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
  canvasEditor.canvas.renderAll()
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
  canvasEditor.canvas.renderAll()
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
  canvasEditor.canvas.renderAll()
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

const drawingLineModeSwitch = (type: string) => {
  if (state.lineType === 'freeDraw_base' || state.lineType === 'freeDraw_circle') {
    state.isDrawingLineMode = false
    state.lineType = ''
    canvasEditor.canvas.isDrawingMode = false
  }

  if (state.lineType === type) {
    state.isDrawingLineMode = false
    state.lineType = ''
  } else {
    state.isDrawingLineMode = true
    state.lineType = type
  }
  canvasEditor.setMode(state.isDrawingLineMode)
  canvasEditor.setLineType(type)
  canvasEditor.canvas.forEachObject(obj => {
    if (obj.id !== 'workspace') {
      obj.selectable = !state.isDrawingLineMode
      obj.evented = !state.isDrawingLineMode
    }
  })
}

const freeDraw = (type: string) => {
  if (state.lineType === type) {
    state.isDrawingLineMode = false
    state.lineType = ''
    canvasEditor.canvas.isDrawingMode = false
  } else {
    endDrawingLineMode()
    state.isDrawingLineMode = true
    state.lineType = type

    canvasEditor.canvas.isDrawingMode = true
    if (type === 'freeDraw_base') {
      canvasEditor.canvas.freeDrawingBrush = new fabric.PencilBrush(canvasEditor.canvas)
    } else if (type === 'freeDraw_circle') {
      canvasEditor.canvas.freeDrawingBrush = new fabric.CircleBrush(canvasEditor.canvas)
    }
    canvasEditor.canvas.freeDrawingBrush.width = 20
    canvasEditor.canvas.freeDrawingBrush.color = '#000000'
  }
}

const endDrawingLineMode = () => {
  state.isDrawingLineMode = false
  state.lineType = ''
  canvasEditor.setMode(state.isDrawingLineMode)
  canvasEditor.setLineType(state.lineType)
}

const addText = () => {
  const text = new fabric.IText('点击编辑文本', {
    ...defaultPosition,
    fontSize: 80,
    fill: '#000000',
    id: uuid()
  })
  canvasEditor.canvas.add(text)
  canvasEditor.position('center', text)
  canvasEditor.canvas.setActiveObject(text)
  canvasEditor.canvas.renderAll()
}

const addVerticalText = () => {
  const textbox = new fabric.Textbox('点击编辑文本', {
    ...defaultPosition,
    fontSize: 80,
    fill: '#000000',
    id: uuid(),
    splitByGrapheme: true // 自动换行
  })
  textbox.setControlVisible('mt', false)
  textbox.setControlVisible('mb', false)
  textbox.setControlVisible('ml', false)
  textbox.setControlVisible('mr', false)
  textbox.setControlsVisibility({ mtr: false })
  canvasEditor.canvas.add(textbox)
  canvasEditor.position('center', textbox)
  canvasEditor.canvas.setActiveObject(textbox)
  canvasEditor.canvas.renderAll()
}

const addPathText = () => {
  if (state.lineType === 'pathText') {
    state.isDrawingLineMode = false
    state.lineType = ''
    canvasEditor.endTextPathDraw()
  } else {
    state.isDrawingLineMode = true
    state.lineType = 'pathText'
    canvasEditor.startTextPathDraw()
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
  margin-bottom: 25px;
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
    &.active {
      background: #edf9ff;
      svg {
        fill: #2d8cf0;
      }
    }
  }
}
</style>
