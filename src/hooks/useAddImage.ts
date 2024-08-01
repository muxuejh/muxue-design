import { fabric } from 'fabric'
import { v4 as uuid } from 'uuid'
import useEditorStore from '@/stores/modules/editor'
import useCalcDrag from './useCalcDrag'
import { showFullScreenLoading, hideFullScreenLoading } from '@/config/serviceLoading'

export default function useAddImage() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const addImage = (imageUrl: string, options?: { event: DragEvent }) => {
    showFullScreenLoading()
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
        hideFullScreenLoading()
      },
      { crossOrigin: 'anonymous' }
    )
  }

  const replaceImage = async (imageUrl: string) => {
    showFullScreenLoading()
    const imgElement = await getImageElement(imageUrl)
    const activeObject = canvasEditor.canvas.getActiveObject() as fabric.Image
    const width = activeObject.get('width')!
    const height = activeObject.get('height')!
    const scaleX = activeObject.get('scaleX')!
    const scaleY = activeObject.get('scaleY')!
    activeObject.setSrc(imageUrl, () => {
      activeObject.set('scaleX', (width * scaleX) / imgElement.width)
      activeObject.set('scaleY', (height * scaleY) / imgElement.height)
      canvasEditor.canvas.renderAll()
    })
    imgElement.remove()
    hideFullScreenLoading()
  }

  function getWorkspaceWidth() {
    // @ts-ignore
    const { width } = canvasEditor.getWorkspace()
    return width
  }

  function handleEvent(item: fabric.Object, event: DragEvent) {
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

  /**
   * 获取图片元素
   * @param imgSrc 图片地址
   * @returns
   */
  const getImageElement = (imgSrc: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imgSrc
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('load image error'))
    })
  }

  return { addImage, replaceImage }
}
