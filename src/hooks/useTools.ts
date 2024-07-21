import useEditorStore from '@/stores/modules/editor'

export function useTools() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const clear = () => {
    canvasEditor.canvas.getObjects().forEach(obj => {
      if (obj.id !== 'workspace') {
        canvasEditor.canvas.remove(obj)
      }
    })
    // @ts-ignore
    canvasEditor.setWorkspaceBgColor('#fff')
    canvasEditor.canvas.discardActiveObject()
    canvasEditor.canvas.renderAll()
  }

  const toggleRuler = (rulerSwitch: boolean) => {
    if (rulerSwitch) {
      // @ts-ignore
      canvasEditor.rulerEnable()
    } else {
      // @ts-ignore
      canvasEditor.rulerDisable()
    }
  }

  return { clear, toggleRuler }
}
