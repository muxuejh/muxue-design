/**
 * 复制元素
 */
import useEditorStore from '@/stores/modules/editor'
import { fabric } from 'fabric'

export default function useCopy() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const activeObject = canvasEditor.canvas.getActiveObject()
  if (activeObject) {
    activeObject.clone((cloned: fabric.Object) => {
      cloned.set({
        left: cloned.left! + 20,
        top: cloned.top! + 20,
        evented: true
      })
      canvasEditor.canvas.add(cloned)
      canvasEditor.canvas.setActiveObject(cloned)
      canvasEditor.canvas.renderAll()
    })
  }
}
