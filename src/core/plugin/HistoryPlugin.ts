/**
 * 历史记录插件
 */
import { fabric } from 'fabric'
import Editor from '../core'
import '../utils/fabric-history.js'
import { event } from '../event/index.js'

type IEditor = Editor
type extendCanvas = {
  undo: () => void
  redo: () => void
  clearHistory: () => void
  historyUndo: any[]
  historyRedo: any[]
}

class HistoryPlugin implements IPluginTempl {
  static pluginName = 'HistoryPlugin'
  static apis = ['undo', 'redo']
  static events = ['historyUpdate']
  hotkeys: string[] = ['ctrl+z', 'ctrl+shift+z', '⌘+z', '⌘+shift+z']
  constructor(
    public canvas: fabric.Canvas & extendCanvas,
    public editor: IEditor
  ) {
    fabric.Canvas.prototype._historyNext = () => {
      return this.getJson()
    }
    this._init()
  }

  _init() {
    this.canvas.on('history:append', () => {
      this.historyUpdate()
    })
    /* window.addEventListener('beforeunload', e => {
      if (this.canvas.historyUndo.length > 0) {
        ;(e || window.event).returnValue = '确认离开'
      }
    }) */
  }

  historyUpdate() {
    const { historyUndo, historyRedo } = this.canvas
    // console.log('historyUndo', historyUndo)
    // console.log('historyRedo', historyRedo)
    event.emit('historyUpdate', historyUndo.length, historyRedo.length)
  }

  /* // 导入模板之后，清理 History 缓存
  hookImportAfter() {
    this.canvas.clearHistory()
    this.historyUpdate()
    return Promise.resolve()
  } */

  undo() {
    if (this.canvas.historyUndo.length === 1) {
      this.canvas.clearUndo()
      this.clear()
    }
    this.canvas.undo()
    this.historyUpdate()
  }

  redo() {
    this.canvas.redo()
    this.historyUpdate()
  }

  getJson() {
    return this.canvas.toJSON([
      'id',
      'gradientAngle',
      'selectable',
      'hasControls',
      'linkData',
      'editable',
      'extensionType',
      'extension'
    ])
  }

  clear() {
    this.canvas.getObjects().forEach(obj => {
      if (obj.id !== 'workspace') {
        this.canvas.remove(obj)
      }
    })
    // @ts-ignore
    this.editor?.setWorkspaceBgColor('#fff')
    this.canvas.discardActiveObject()
    this.canvas.renderAll()
  }

  /* // 快捷键扩展回调
  hotkeyEvent(eventName: string, e: KeyboardEvent) {
    if (e.type === 'keydown') {
      switch (eventName) {
        case 'ctrl+z':
        case '⌘+z':
          this.undo()
          break
        case 'ctrl+shift+z':
        case '⌘+shift+z':
          this.redo()
          break
      }
    }
  } */
}

export default HistoryPlugin
