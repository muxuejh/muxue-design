import { onBeforeUnmount, onMounted, inject, ref } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import CanvasEvent from '@/core/event'

export default function useLock() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!
  const canvasEvent = inject('canvasEvent') as CanvasEvent

  const isHide = ref(false)

  const doHide = (hide: boolean) => {
    const activeObject = editorStore.getActiveObjects()[0]
    activeObject && activeObject.set('visible', !hide)
    canvasEditor.canvas.renderAll()
    isHide.value = hide
  }

  const handleSelected = (e?: fabric.Object[]) => {
    if (e && e[0]) {
      isHide.value = !e[0].visible
    }
  }

  onMounted(() => {
    canvasEvent.on('selectOne', handleSelected)
  })

  onBeforeUnmount(() => {
    canvasEvent.off('selectOne', handleSelected)
  })

  return {
    isHide,
    doHide
  }
}
