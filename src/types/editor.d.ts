declare interface IPluginOption {
  [propName: string]: unknown
}

// 生命周期事件类型
declare type IEditorHooksType =
  | 'hookImportBefore'
  | 'hookImportAfter'
  | 'hookSaveBefore'
  | 'hookSaveAfter'

// 插件class
declare interface IPluginClass extends IPluginTempl {
  new (canvas: fabric.Canvas, editor: any, options: IPluginOption): IPluginTempl
}

// 插件实例
declare interface IPluginTempl {
  pluginName: string
  events: string[]
  apis: string[]
  canvas: fabric.Canvas
  hotkeyEvent: (name: string, e: Event) => viode
  [propName: IEditorHooksType]: () => void
  [propName: string]: any
}
