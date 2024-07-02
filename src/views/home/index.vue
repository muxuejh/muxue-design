<template>
  <div>
    <div class="header-container"></div>

    <div class="main-container">
      <!-- 左侧菜单 -->
      <div class="sidebar-container">
        <div class="menu">
          <div class="bar" :style="barStyle"></div>
          <div
            class="menu-item"
            :class="{ active: index === activeIndex }"
            v-for="(menu, index) in menus"
            :key="index"
            @click="changeMenu(index)"
          >
            <SvgIcon
              class="icon"
              :name="menu.icon"
              :color="index === activeIndex ? '#409EFF' : '#000000'"
            />
            <span class="text">{{ menu.name }}</span>
          </div>
        </div>

        <div class="menu-content" :class="appStore.isMenuContentCollapse ? 'hidden' : ''">
          <component v-show="!appStore.isMenuContentCollapse" :is="copms[activeIndex]" />
        </div>

        <MenuSwitch target="sidebar" />
      </div>

      <!-- 画布区域 -->
      <div class="canvas-editor-container">
        <div id="workspace">
          <div class="canvas-wrap">
            <div class="inside-shadow"></div>
            <canvas id="canvasId"></canvas>
            <Zoom />
          </div>
        </div>
      </div>

      <!-- 属性区域 -->
      <div class="config-panel-container" :class="appStore.isConfigPanelCollapse ? 'hidden' : ''">
        <div class="attr-item">
          <Lock />
        </div>
        <AlignCenter />
        <PositionAndSize />

        <MenuSwitch target="configPanel" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import { fabric } from 'fabric'
import useAppStore from '@/stores/modules/app'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

import SvgIcon from '@/components/SvgIcon.vue'
import MenuSwitch from '@/components/MenuSwitch.vue'

import Template from '@/components/sidebar/Template.vue'
import Material from '@/components/sidebar/Material.vue'
import Element from '@/components/sidebar/Element.vue'
import Layer from '@/components/sidebar/Layer.vue'

import Zoom from '@/components/Zoom.vue'

import Lock from '@/components/configPanel/Lock.vue'
import AlignCenter from '@/components/configPanel/AlignCenter.vue'
import PositionAndSize from '@/components/configPanel/PositionAndSize.vue'

import Editor, {
  RulerPlugin,
  WorkspacePlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  CenterAlignPlugin
} from '@/core'

const appStore = useAppStore()

// 创建编辑器
const canvasEditor = new Editor()

const canvasEvent = new CanvasEvent()

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
  canvasEditor.use(CenterAlignPlugin)

  // @ts-ignore
  canvasEditor.rulerEnable()

  canvasEvent.init(canvas)
})

const copms = [Template, Material, Element, Layer]
const activeIndex = ref(0)
const menus = ref([
  { name: '模板', icon: 'template' },
  { name: '素材', icon: 'material' },
  { name: '元素', icon: 'element' },
  { name: '图层', icon: 'layer' }
])
const barStyle = ref({ transform: 'translateY(0)' })
const changeMenu = (index: number) => {
  barStyle.value.transform = `translateY(${index * 66}px)`
  activeIndex.value = index
}

provide('canvasEditor', canvasEditor)
provide('canvasEvent', canvasEvent)
const editorStore = useEditorStore()
editorStore.setCanvasEditor(canvasEditor)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
