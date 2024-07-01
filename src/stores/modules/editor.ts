import Editor from '@/core'
import { defineStore } from 'pinia'
import { markRaw, ref } from 'vue'

type IEditor = Editor

const useEditorStore = defineStore('editor', () => {
  const editor = markRaw({
    canvasEditor: null as IEditor | null, // 画布编辑器
    activeObjects: [] as fabric.Object[] // 当前选中的对象
  })

  const SelectMode = ref('') // 事件类型

  const setCanvasEditor = (value: IEditor) => {
    editor.canvasEditor = value
  }
  const getCanvasEditor = () => {
    return editor.canvasEditor
  }

  const setActiveObjects = (value: fabric.Object[]) => {
    editor.activeObjects = value
  }
  const getActiveObjects = () => {
    return editor.activeObjects
  }

  const setEventType = (value: string) => {
    SelectMode.value = value
  }

  return {
    setCanvasEditor,
    getCanvasEditor,
    setActiveObjects,
    getActiveObjects,
    setEventType,
    SelectMode
  }
})

export default useEditorStore
