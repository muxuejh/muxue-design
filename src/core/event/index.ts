/**
 * 画布事件
 */

import { EventEmitter } from 'events'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import useEditorStore from '@/stores/modules/editor'
import { SelectMode, SelectEvent } from './type'

const event = new EventEmitter()

// const editorStore = useEditorStore()

class CanvasEvent extends EventEmitter {
  // @ts-ignore
  handler: Canvas
  editorStore = useEditorStore()

  init(handler: Canvas) {
    this.handler = handler
    if (this.handler) {
      this.handler.on('selection:created', () => this.selected())
      this.handler.on('selection:updated', () => this.selected())
      this.handler.on('selection:cleared', () => this.selected())
      this.handler.on('object:modified', () => this.emit('objectModified'))
    }
  }

  private selected() {
    if (!this.handler) throw new Error('canvas is not init')

    const activeObjects = this.handler
      .getActiveObjects()
      .filter(item => !(item instanceof fabric.GuideLine)) // 过滤掉辅助线

    if (activeObjects && activeObjects.length === 1) {
      this.editorStore.setEventType(SelectMode.ONE)
      this.emit(SelectEvent.ONE, activeObjects)
      this.editorStore.setSelectType(activeObjects[0].type!)
      this.editorStore.setSelectId(activeObjects[0].id!)
      this.editorStore.setSelectIds(activeObjects.map(item => item.id!))
    } else if (activeObjects && activeObjects.length > 1) {
      this.editorStore.setEventType(SelectMode.MULTIPLE)
      this.emit(SelectEvent.MULTIPLE, activeObjects)
      this.editorStore.setSelectId('')
      this.editorStore.setSelectIds(activeObjects.map(item => item.id!))
    } else {
      this.editorStore.setEventType(SelectMode.EMPTY)
      this.emit(SelectEvent.CANCEL, activeObjects)
      this.editorStore.setSelectType('')
      this.editorStore.setSelectId('')
      this.editorStore.setSelectIds([])
    }

    this.editorStore.setActiveObjects(activeObjects)
  }
}

export default CanvasEvent
export { event }
