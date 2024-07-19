import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import { downloadByBase64 } from '@/utils/download'

export function useSave() {
  const editorStore = useEditorStore()
  const canvasEditor = editorStore.getCanvasEditor()!

  const saveImg = () => {
    const { left, top, width, height } = getWorkspace() as fabric.Object
    const option = {
      format: 'png',
      // quality: 1,
      width,
      height,
      left,
      top
    }
    canvasEditor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    const dataUrl = canvasEditor.canvas.toDataURL(option)
    downloadByBase64(dataUrl, 'png')
    // @ts-ignore
    canvasEditor.auto()
  }

  const saveSvg = () => {
    const { left, top, width, height } = getWorkspace() as fabric.Object
    const option = {
      width,
      height,
      viewBox: {
        x: left,
        y: top,
        width,
        height
      }
    }
    const dataUrl = canvasEditor.canvas.toSVG(option)
    const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`
    downloadByBase64(fileStr, 'svg')
  }

  const getWorkspace = () => canvasEditor.canvas.getObjects().find(item => item.id === 'workspace')

  return { saveImg, saveSvg }
}
