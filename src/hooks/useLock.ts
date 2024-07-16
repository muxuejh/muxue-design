import { onBeforeUnmount, onMounted, inject, ref } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

export default function useLock() {
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
      isLock.value = !e[0].hasControls
    }
  }

  onMounted(() => {
    canvasEvent.on('selectOne', handleSelected)
  })

  onBeforeUnmount(() => {
    canvasEvent.off('selectOne', handleSelected)
  })

  return {
    isLock,
    doLock
  }
}
