import useEditorStore from '@/stores/modules/editor'

export default function useLayer() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()

  const workspaceSendToBack = () => {
    return canvasEditor?.canvas.getObjects().find(item => item.id === 'workspace')
  }

  const up = () => {
    const activeObjects = canvasEditor?.canvas.getActiveObjects()
    if (activeObjects && activeObjects.length === 1) {
      const activeObject = activeObjects[0]
      activeObject && activeObject.bringForward()
      canvasEditor?.canvas.renderAll()
      workspaceSendToBack()
    }
  }

  const down = () => {
    const activeObjects = canvasEditor?.canvas.getActiveObjects()
    if (activeObjects && activeObjects.length === 1) {
      const activeObject = activeObjects[0]
      activeObject && activeObject.sendBackwards()
      canvasEditor?.canvas.renderAll()
      workspaceSendToBack()
    }
  }

  const toFront = () => {
    const activeObjects = canvasEditor?.canvas.getActiveObjects()
    if (activeObjects && activeObjects.length === 1) {
      const activeObject = activeObjects[0]
      activeObject && activeObject.bringToFront()
      canvasEditor?.canvas.renderAll()
      workspaceSendToBack()
    }
  }

  const toBack = () => {
    const activeObjects = canvasEditor?.canvas.getActiveObjects()
    if (activeObjects && activeObjects.length === 1) {
      const activeObject = activeObjects[0]
      activeObject && activeObject.sendToBack()
      canvasEditor?.canvas.renderAll()
      workspaceSendToBack()
    }
  }

  return {
    up,
    down,
    toFront,
    toBack
  }
}
