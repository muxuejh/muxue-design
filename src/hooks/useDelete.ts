/**
 * 删除元素
 */

import useEditorStore from '@/stores/modules/editor'

export default function useDelete() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const acticeObjects = canvasEditor.canvas.getActiveObjects()
  if (acticeObjects) {
    acticeObjects.map(item => canvasEditor.canvas.remove(item))
    canvasEditor.canvas.discardActiveObject()
    canvasEditor.canvas.renderAll()
  }
}
