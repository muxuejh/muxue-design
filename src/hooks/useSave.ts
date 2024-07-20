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
      width: width as number,
      height: height as number,
      viewBox: {
        x: left as number,
        y: top as number,
        width: width as number,
        height: height as number
      }
    }
    const dataUrl = canvasEditor.canvas.toSVG(option)
    const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`
    downloadByBase64(fileStr, 'svg')
  }

  const saveJson = () => {
    const dataUrl = canvasEditor.canvas.toJSON([
      'id',
      'gradientAngle',
      'selectable',
      'hasControls',
      'linkData',
      'editable',
      'extensionType',
      'extension'
    ])
    transformText(dataUrl.objects)
    const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, '\t')
    )}`
    downloadByBase64(fileStr, 'json')
  }

  const getWorkspace = () => canvasEditor.canvas.getObjects().find(item => item.id === 'workspace')

  /**
   * 把 text 类型转换为 textbox 类型，导入可以编辑
   * @param objects
   * @returns
   */
  const transformText = (objects: any) => {
    if (!objects) return
    objects.forEach((item: any) => {
      if (item.objects) {
        transformText(item.objects)
      } else {
        item.type === 'text' && (item.type = 'textbox')
      }
    })
  }

  const isEmptyWorkspace = () => {
    const activeObjects = canvasEditor.canvas
      .getObjects()
      .filter(item => !(item instanceof fabric.GuideLine) && item.id !== 'workspace') // 过滤掉辅助线和工作区

    if (activeObjects && activeObjects.length > 0) {
      return false
    }
    return true
  }

  return { saveImg, saveSvg, saveJson, isEmptyWorkspace }
}
