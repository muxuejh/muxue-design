/**
 * 画布事件
 */

import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import useEditorStore from '@/stores/modules/editor'
import { SelectMode } from './type'

// const editorStore = useEditorStore()

class CanvasEvent {
  // @ts-ignore
  handler: Canvas
  editorStore = useEditorStore()

  init(handler: Canvas) {
    this.handler = handler
    this.handler.on('selection:created', () => this.selected())
    this.handler.on('selection:updated', () => this.selected())
    this.handler.on('selection:cleared', () => this.selected())
  }

  private selected() {
    if (!this.handler) throw new Error('canvas is not init')

    const activeObjects = this.handler
      .getActiveObjects()
      .filter(item => !(item instanceof fabric.GuideLine)) // 过滤掉辅助线

    if (activeObjects && activeObjects.length === 1) {
      this.editorStore.setEventType(SelectMode.ONE)
      this.editorStore.setActiveObjects(activeObjects)
    } else if (activeObjects && activeObjects.length > 1) {
      this.editorStore.setEventType(SelectMode.MULTIPLE)
      this.editorStore.setActiveObjects(activeObjects)
    } else {
      this.editorStore.setEventType(SelectMode.EMPTY)
    }

    this.editorStore.setActiveObjects(activeObjects)
  }
}

export default CanvasEvent
