<template>
  <el-tooltip :content="isLock ? '解锁' : '锁定'">
    <div v-if="!isLock" class="icon" @click="doLock(true)">
      <svg
        t="1719476299054"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6109"
        width="16"
        height="16"
      >
        <path
          d="M467.2 713.92v115.968a44.8 44.8 0 0 0 89.6 0v-115.968c26.752-14.72 44.8-42.304 44.8-73.92 0-47.104-40.128-85.312-89.6-85.312-49.472 0-89.6 38.208-89.6 85.312 0 31.616 18.048 59.136 44.8 73.92zM243.2 384h448V256c0-94.272-80.256-170.688-179.2-170.688-98.944 0-179.2 76.416-179.2 170.688H243.2c0-141.44 120.32-256 268.8-256 148.48 0 268.8 114.56 268.8 256v128H960v640H64V384h179.2z"
          fill="#333333"
          p-id="6110"
        ></path>
      </svg>
    </div>
    <div v-else class="icon" @click="doLock(false)">
      <svg
        t="1719476213928"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4271"
        width="16"
        height="16"
      >
        <path
          d="M467.2 713.92v115.968a44.8 44.8 0 0 0 89.6 0v-115.968c26.752-14.72 44.8-42.304 44.8-73.92 0-47.104-40.128-85.312-89.6-85.312-49.472 0-89.6 38.208-89.6 85.312 0 31.616 18.048 59.136 44.8 73.92zM64 384h896v640H64V384z m268.8 0h358.4V256c0-94.272-80.256-170.688-179.2-170.688-98.944 0-179.2 76.416-179.2 170.688v128zM512 0c148.48 0 268.8 114.56 268.8 256v128H243.2V256c0-141.44 120.32-256 268.8-256z"
          fill="#333333"
          p-id="4272"
        ></path>
      </svg>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { onMounted, ref, inject, onBeforeUnmount } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!
const canvasEvent = inject('canvasEvent') as CanvasEvent

const isLock = ref(false)
const doLock = (lock: boolean) => {
  isLock.value = lock
  const activeObject = editorStore.getActiveObjects()[0]
  activeObject.hasControls = !lock // 是否显示控制点
  activeObject.lockMovementX = lock
  activeObject.lockMovementY = lock
  activeObject.lockRotation = lock
  activeObject.lockScalingX = lock
  activeObject.lockScalingY = lock
  activeObject.selectable = !lock
  canvasEditor.canvas.renderAll()
}

const handleSelected = (e?: fabric.Object[]) => {
  if (e && e[0]) {
    isLock.value = e[0].hasControls ? false : true
  }
}

onMounted(() => {
  canvasEvent.on('selectOne', handleSelected)
})

onBeforeUnmount(() => {
  canvasEvent.off('selectOne', handleSelected)
})
</script>

<style scoped></style>
