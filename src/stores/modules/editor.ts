import Editor from '@/core'
import { defineStore } from 'pinia'
import { markRaw, ref } from 'vue'

type IEditor = Editor

const useEditorStore = defineStore('editor', () => {
  const editor = markRaw({
    canvasEditor: null as IEditor | null, // 画布编辑器
    activeObjects: [] as fabric.Object[] // 当前选中的对象
  })

  const selectMode = ref('') // 事件类型
  const selectType = ref('') // 选中元素的类型
  const selectId = ref('') // 选中元素的id
  const selectIds = ref<string[]>([]) // 选中元素的id集合

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
    selectMode.value = value
  }

  const setSelectType = (value: string) => {
    selectType.value = value
  }

  const setSelectId = (value: string) => {
    selectId.value = value
  }

  const setSelectIds = (value: string[]) => {
    selectIds.value = value
  }

  return {
    setCanvasEditor,
    getCanvasEditor,
    setActiveObjects,
    getActiveObjects,
    setEventType,
    setSelectType,
    setSelectId,
    setSelectIds,
    selectMode,
    selectType,
    selectId,
    selectIds
  }
})

export default useEditorStore
