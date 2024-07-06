/**
 * 元素属性操作
 */
import { inject, onBeforeUnmount, onMounted } from 'vue'
import CanvasEvent from '@/core/event'
import useEditorStore from '@/stores/modules/editor'
import { fabric } from 'fabric'

export default function useFabricObjectAttr(
  getAttributeCallback: (activeObject?: fabric.Object | undefined) => void,
  setAttributeCallback: (activeObject?: fabric.Object | undefined, key?: any, value?: any) => void
) {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!
  const canvasEvent = inject('canvasEvent') as CanvasEvent

  const getFabricObjectAttr = (e?: fabric.Object[]) => {
    const activeObject = canvasEditor.canvas.getActiveObject()
    // 不是当前obj，则跳过
    if (e && e.length > 0 && e[0] !== activeObject) return
    if (activeObject) {
      getAttributeCallback(activeObject)
    }
  }

  const setFabricObjectAttr = (key?: any, value?: any) => {
    const activeObject = canvasEditor.canvas.getActiveObject()!
    setAttributeCallback(activeObject, key, value)
    canvasEditor.canvas.renderAll()
  }

  onMounted(() => {
    canvasEvent.on('selectOne', getFabricObjectAttr)
    canvasEvent.on('objectModified', getFabricObjectAttr)
  })

  onBeforeUnmount(() => {
    canvasEvent.off('selectOne', getFabricObjectAttr)
    canvasEvent.off('objectModified', getFabricObjectAttr)
  })

  return {
    getFabricObjectAttr,
    setFabricObjectAttr
  }
}
