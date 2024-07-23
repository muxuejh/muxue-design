import { fabric } from 'fabric'
import { v4 as uuid } from 'uuid'
import useEditorStore from '@/stores/modules/editor'
import useCalcDrag from './useCalcDrag'

export default function useAddImage(imageUrl: string, options?: { event: DragEvent }) {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const { event = false } = options || {}

  fabric.Image.fromURL(
    imageUrl,
    img => {
      img.set({
        id: uuid()
      })
      img.scaleToWidth(getWorkspaceWidth() / 2) // 将对象缩放到指定的宽度，这里设置成画布宽度的一半
      event && handleEvent(img, event) // 拖拽
      // @ts-ignore
      !event && canvasEditor.position('center', img)
      canvasEditor.canvas.add(img)
      canvasEditor.canvas.setActiveObject(img)
      canvasEditor.canvas.renderAll()
    },
    { crossOrigin: 'anonymous' }
  )
}

function getWorkspaceWidth() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!
  // @ts-ignore
  const { width } = canvasEditor.getWorkspace()
  return width
}

function handleEvent(item: fabric.Object, event: DragEvent) {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const { left, top } = useCalcDrag().getCanvasRect()
  if (event.x < left || event.y < top || item.width === undefined) return
  const point = {
    x: event.x - left,
    y: event.y - top
  }
  const pointerVpt = canvasEditor.canvas.restorePointerVpt(point) // restorePointerVpt() 返回指针坐标
  item.set({
    left: pointerVpt.x,
    top: pointerVpt.y
  })
}
