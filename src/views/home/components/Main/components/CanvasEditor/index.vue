<template>
  <div class="canvas-editor-container">
    <div id="workspace">
      <div class="canvas-wrap">
        <div class="inside-shadow"></div>
        <canvas id="canvasId"></canvas>
        <Zoom />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import Zoom from '@/components/Zoom.vue'
import Editor, { RulerPlugin, WorkspacePlugin, AlignGuidLinePlugin, ControlsPlugin } from '@/core'

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
  canvasEditor.use(AlignGuidLinePlugin)
  canvasEditor.use(ControlsPlugin)

  canvasEditor.rulerEnable()
})

provide('canvasEditor', canvasEditor)
const editorStore = useEditorStore()
editorStore.setCanvasEditor(canvasEditor)
</script>

<style scoped lang="scss">
.canvas-editor-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
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
      .inside-shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 9px 2px #0000001f;
        z-index: 2;
        pointer-events: none;
      }
    }
  }
}
</style>
