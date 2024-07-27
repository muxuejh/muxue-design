/**
 * 右键菜单
 */
import { fabric } from 'fabric'
import Editor from '../core'

type IEditor = Editor

export default class ContextMenuPlugin {
  static pluginName = 'ContextMenuPlugin'
  static apis = ['hiddenContextMenu']
  public canvas: fabric.Canvas
  public editor: IEditor
  public contextMenuEl: HTMLElement

  constructor(canvas: fabric.Canvas, editor: IEditor) {
    this.canvas = canvas
    this.editor = editor
    this.contextMenuEl = document.getElementById('context-menu') as HTMLElement
    this.init()
  }

  init() {
    this.canvas.on('mouse:down', opt => {
      if (opt.button === 3 && opt.target && opt.target.id !== 'workspace') {
        this.canvas.setActiveObject(opt.target)

        // 菜单宽高
        const menuWidth = this.contextMenuEl.offsetWidth
        const menuHeight = this.contextMenuEl.offsetHeight

        // 当前鼠标位置
        let pointX = opt.pointer!.x
        let pointY = opt.pointer!.y

        // 计算菜单出现的位置
        // 如果鼠标靠近画布右侧，菜单就出现在鼠标指针左侧
        if (this.canvas.width! - pointX <= menuWidth) {
          pointX -= menuWidth
        }
        // 如果鼠标靠近画布底部，菜单就出现在鼠标指针上方
        if (this.canvas.height! - pointY <= menuHeight) {
          pointY -= menuHeight
        }

        // @ts-ignore
        this.contextMenuEl.style = `
            visibility: visible;
            left: ${pointX}px;
            top: ${pointY}px;
            z-index: 100;
          `
      } else {
        this.hiddenContextMenu()
      }
    })
  }

  hiddenContextMenu() {
    // @ts-ignore
    this.contextMenuEl.style = `
        visibility: hidden;
        left: 0;
        top: 0;
        z-index: -100;
      `
  }
}
