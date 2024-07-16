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
          :class="{ active: isSelected(item) }"
          v-for="item in layerList"
          :key="item.id"
          @click="selectLayer(item.id)"
        >
          <div class="layer-item-content">
            <div class="left">
              <SvgIcon
                :name="
                  item.type === 'image' ? 'image' : item.type.includes('text') ? 'text' : 'shape'
                "
                class="mt-0.5"
              />
              <span class="px-3">|</span>
              <span class="truncate w-40">{{ layerName(item) }}</span>
            </div>
            <div class="right">
              <SvgIcon
                class="icon"
                :name="item.hasControls ? 'lockClose' : 'lockOpen'"
                width="14px"
                height="14px"
                style="margin-bottom: 2px"
                @click.stop="doLock(item.hasControls)"
              />
              <el-icon class="icon" style="margin-bottom: 1px" @click.stop="useDelete">
                <DeleteFilled />
              </el-icon>
              <SvgIcon
                class="icon"
                :name="item.visible ? 'view' : 'hide'"
                width="16px"
                height="16px"
                @click.stop="doHide(item.visible)"
              />
            </div>
          </div>
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
import useEditorStore from '@/stores/modules/editor'
import useLayer from '@/hooks/useLayer'
import useDelete from '@/hooks/useDelete'
import useLock from '@/hooks/useLock'
import useHide from '@/hooks/useHide'
import SvgIcon from '@/components/SvgIcon.vue'
import { DeleteFilled } from '@element-plus/icons-vue'

interface ILayer {
  type: string
  id: string
  name: string
  text: string
  hasControls: boolean
  visible: boolean
}

const { doLock } = useLock()
const { doHide } = useHide()

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()

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
      const { type, id, name, text, hasControls, visible } = item
      return { type, id, name, text, hasControls, visible }
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

const selectLayer = (id: string) => {
  const layer = canvasEditor?.canvas.getObjects().find(item => item.id === id) as fabric.Object
  canvasEditor?.canvas.discardActiveObject()
  canvasEditor?.canvas.setActiveObject(layer)
  canvasEditor?.canvas.requestRenderAll()
}

const isSelected = (item: ILayer) => {
  return item.id === editorStore.selectId || editorStore.selectIds.includes(item.id)
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
    height: 44px;
    margin-bottom: 5px;
    padding: 0 10px;
    line-height: 44px;
    background: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
    &.active:hover .layer-item-content .right {
      opacity: 1;
    }
    &.active {
      background-color: #edf9ff;
      color: #409eff;
    }
    .layer-item-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .right {
        display: flex;
        align-items: center;
        opacity: 0;
        .icon {
          margin: 0 5px;
          box-sizing: border-box;
        }
      }
    }
  }
}

.empty {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
