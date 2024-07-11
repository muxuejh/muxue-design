<template>
  <div>
    <template v-if="layerList.length">
      <div class="btn-wrap">
        <SvgIcon class="btn" name="arrowTop2" @click="setZIndex('up')" />
        <SvgIcon class="btn" name="arrowBottom2" @click="setZIndex('down')" />
        <SvgIcon class="btn" name="arrowTop1" @click="setZIndex('toFront')" />
        <SvgIcon class="btn" name="arrowBottom1" @click="setZIndex('toBack')" />
      </div>
      <div class="layer-list">
        <div
          class="layer-item"
          :class="{ active: index === activeIndex }"
          v-for="(item, index) in layerList"
          :key="item.id"
          @click="selectLayer(item.id, index)"
        >
          {{ layerName(item) }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty">暂无图层~</div>
    </template>
  </div>
</template>

<script setup lang="ts" name="Layer">
import { onMounted, ref } from 'vue'
import { fabric } from 'fabric'
import SvgIcon from '@/components/SvgIcon.vue'
import useEditorStore from '@/stores/modules/editor'
import useLayer from '@/hooks/useLayer'

interface ILayer {
  type: string
  id: string
  name: string
  text: string
}

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()

const activeIndex = ref(0)
const layerList = ref<ILayer[]>([])

const getLayerList = () => {
  layerList.value = canvasEditor?.canvas
    .getObjects()
    .filter(item => {
      return !(item instanceof fabric.GuideLine || item.id === 'workspace')
    })
    .reverse()
    .map(item => {
      // @ts-ignore
      const { type, id, name, text } = item
      return { type, id, name, text }
    }) as ILayer[]
}

const layerName = (item: ILayer) => {
  if (item.type.includes('text')) {
    return item.name || item.text
  }
  const typeText = {
    group: '组合',
    image: '图片',
    rect: '矩形',
    circle: '圆形',
    triangle: '三角形',
    polygon: '多边形',
    path: '路径'
  }
  // @ts-ignore
  return typeText[item.type] || '默认元素'
}

const selectLayer = (id: string, index: number) => {
  activeIndex.value = index
  const layer = canvasEditor?.canvas.getObjects().find(item => item.id === id) as fabric.Object
  canvasEditor?.canvas.discardActiveObject()
  canvasEditor?.canvas.setActiveObject(layer)
  canvasEditor?.canvas.requestRenderAll()
}

const { up, down, toFront, toBack } = useLayer()
const setZIndex = (type: 'up' | 'down' | 'toFront' | 'toBack') => {
  type === 'up' && up()
  type === 'down' && down()
  type === 'toFront' && toFront()
  type === 'toBack' && toBack()
}

onMounted(() => {
  getLayerList()
  canvasEditor?.canvas.on('after:render', getLayerList)
})
</script>

<style scoped lang="scss">
.btn-wrap {
  display: flex;
  justify-content: space-around;
  margin-bottom: 25px;
  .btn {
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

.layer-list {
  .layer-item {
    margin-bottom: 5px;
    padding: 12px 10px;
    background: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #edf9ff;
      color: #409eff;
    }
    &.active {
      background-color: #edf9ff;
      color: #409eff;
    }
  }
}

.empty {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
