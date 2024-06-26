import Editor from '@/core'
import { defineStore } from 'pinia'
import { markRaw } from 'vue'

type IEditor = Editor

const useEditorStore = defineStore('editor', () => {
  const editor = markRaw({
    canvasEditor: null as IEditor | null // 画布编辑器
  })

  const setCanvasEditor = (value: IEditor) => {
    editor.canvasEditor = value
  }

  const getCanvasEditor = () => {
    return editor.canvasEditor
  }

  return {
    setCanvasEditor,
    getCanvasEditor
  }
})

export default useEditorStore
