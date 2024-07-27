<template>
  <div id="context-menu" class="context-menu">
    <div class="item" :class="isHover === 1 ? 'hover' : ''">
      <el-popover
        ref="layerPopoverRef"
        placement="right-start"
        :width="220"
        :offset="10"
        :show-arrow="false"
        :teleported="false"
        popper-style="border-radius: 8px;"
      >
        <template #default>
          <div class="popover-content" @mouseover="handleMouseover(1)" @mouseout="handleMouseout">
            <div class="item" @click="handleLayer('up')">图层前移</div>
            <div class="item" @click="handleLayer('down')">图层后移</div>
            <div class="item" @click="handleLayer('toFront')">图层置顶</div>
            <div class="item" @click="handleLayer('toBack')">图层置底</div>
          </div>
        </template>
        <template #reference>
          <div class="popover-title" @mouseover="handleMouseover(1)" @mouseout="handleMouseout">
            <span style="margin-right: 5px">图层顺序</span>
            <SvgIcon
              class="icon"
              name="arrowRight"
              :color="isHover === 1 ? '#153aff' : '#191b27'"
            />
          </div>
        </template>
      </el-popover>
    </div>
    <div class="item" @click="setPosition('centerH')">水平居中</div>
    <div class="item" @click="setPosition('centerV')">垂直居中</div>
    <div class="item" @click="copy">复制</div>
    <div class="item" @click="handleDelete">删除</div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import Editor from '@/core'
import useLayer from '@/hooks/useLayer'
import useCopy from '@/hooks/useCopy'
import useDelete from '@/hooks/useDelete'

const canvasEditor = inject('canvasEditor') as Editor

const isHover = ref()
const handleMouseover = (flag: number) => {
  isHover.value = flag
}
const handleMouseout = () => {
  isHover.value = null
}

const layerPopoverRef = ref()
const { up, down, toFront, toBack } = useLayer()
const handleLayer = (type: string) => {
  type === 'up' && up()
  type === 'down' && down()
  type === 'toFront' && toFront()
  type === 'toBack' && toBack()
  layerPopoverRef.value.hide()
  // @ts-ignore
  canvasEditor.hiddenContextMenu()
}

const setPosition = (position: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  // @ts-ignore
  canvasEditor.position(position, activeObject)
  // @ts-ignore
  canvasEditor.hiddenContextMenu()
}

const copy = () => {
  useCopy()
  // @ts-ignore
  canvasEditor.hiddenContextMenu()
}

const handleDelete = () => {
  useDelete()
  // @ts-ignore
  canvasEditor.hiddenContextMenu()
}
</script>

<style lang="scss" scoped>
.context-menu {
  visibility: hidden;
  z-index: -100;
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  padding: 8px;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  > .item {
    width: 100%;
    height: 32px;
    padding: 0 8px;
    line-height: 32px;
    color: #191b27;
    cursor: pointer;
    &:last-child {
      color: #ff4d4f;
    }
    &:last-child:hover {
      color: #ff4d4f;
    }
    &:hover {
      color: #153aff;
      background: rgba(21, 58, 255, 0.1);
    }
  }
}

.popover-content {
  padding: 8px 0;
  .item {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    padding: 0 20px;
    &:hover {
      color: #153aff;
      background: rgba(21, 58, 255, 0.1);
    }
  }
}

.popover-title {
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    padding-top: 2px;
  }
}
</style>
