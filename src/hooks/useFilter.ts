import useEditorStore from '@/stores/modules/editor'
import { fabric } from 'fabric'

export default function useFilter(type: string, options: any) {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()

  const activeObject = canvasEditor?.canvas.getActiveObject() as fabric.Image
  activeObject.filters = []
  /* switch (type) {
    case 0:
      break
    case 1:
      activeObject.filters.push(new fabric.Image.filters.Grayscale()) // 灰度
      break
    case 2:
      activeObject.filters.push(new fabric.Image.filters.Invert()) //底片
      break
    case 3:
      // @ts-ignore
      activeObject.filters.push(new fabric.Image.filters.BlackWhite()) // 黑白
      break
    case 4:
      activeObject.filters.push(new fabric.Image.filters.Sepia()) // 復古 怀旧
      break
    case 5:
      activeObject.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 })) // 模糊
      break
    case 6:
      // @ts-ignore
      activeObject.filters.push(new fabric.Image.filters.Vintage()) //老照片
      break
  } */
  let imgFilter
  if (type) {
    // @ts-ignore
    imgFilter = new fabric.Image.filters[type](options)
    activeObject.filters.push(imgFilter)
  }
  activeObject.applyFilters()
  canvasEditor?.canvas.renderAll()
}
