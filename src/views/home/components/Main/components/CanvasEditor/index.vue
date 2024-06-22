<template>
  <div class="canvas-editor-container">
    <div id="workspace">
      <div class="canvas-wrap">
        <canvas id="canvasId"></canvas>
        <Zoom />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { fabric } from 'fabric'
import Zoom from '@/components/Zoom.vue'
import Editor, { RulerPlugin, WorkspacePlugin } from '@/core'

// 创建编辑器
const canvasEditor = new Editor()

onMounted(() => {
  // 初始化fabric
  const canvas = new fabric.Canvas('canvasId', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true // 超出clipPath后仍然展示控制条
  })
  canvasEditor.init(canvas)
  canvasEditor.use(RulerPlugin)
  canvasEditor.use(WorkspacePlugin)
  canvasEditor.rulerEnable()

  // 创建一个长方形
  const rect = new fabric.Rect({
    top: 100, // 距离容器顶部 100px
    left: 100, // 距离容器左侧 100px
    width: 100, // 矩形宽度 30px
    height: 100, // 矩形高度 30px
    fill: 'red' // 填充 红色
  })

  canvas.add(rect) // 将矩形添加到 canvas 画布里
})

provide('canvasEditor', canvasEditor)
</script>

<style scoped lang="scss">
.canvas-editor-container {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 30px 30px;
  background-position:
    0 0,
    15px 15px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
    linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);

  #workspace {
    width: 100%;
    height: 100%;
    .canvas-wrap {
      position: relative;
    }
  }
}
</style>
