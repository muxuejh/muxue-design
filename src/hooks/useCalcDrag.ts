import useEditorStore from '@/stores/modules/editor'

export default function useCalcDrag() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  // 获取画布的DOMRect对象
  const getCanvasRect = () => canvasEditor.canvas.getSelectionElement().getBoundingClientRect()

  // 判断坐标是否在画布外
  const isOutsideCanvas = (x: number, y: number) => {
    const { left, right, top, bottom } = getCanvasRect()
    return x < left || x > right || y < top || y > bottom
  }

  return {
    getCanvasRect,
    isOutsideCanvas
  }
}
