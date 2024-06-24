class Editor {
  canvas: fabric.Canvas
  private pluginMap: {
    [propName: string]: IPluginTempl
  } = {}
  // 自定义事件
  private customEvents: string[] = []
  // 自定义API
  private customApis: string[] = []
  // 生命周期函数名
  private hooks: IEditorHooksType[] = [
    'hookImportBefore',
    'hookImportAfter',
    'hookSaveBefore',
    'hookSaveAfter'
  ]
  private hooksEntity: {
    [propName: string]
  } = {}

  init(canvas: fabric.Canvas) {
    this.canvas = canvas
  }

  // 引入组件
  use(plugin: IPluginClass, options?: IPluginOption) {
    if (this._checkPlugin(plugin)) {
      this._saveCustomAttr(plugin)
      const pluginRunTime = new plugin(this.canvas, this, options as IPluginOption)
      this.pluginMap[plugin.pluginName] = pluginRunTime
      this._bindingHooks(pluginRunTime)
      this._bindingHotkeys(pluginRunTime)
      this._bindingApis(pluginRunTime)
    }
  }

  // 检查组件
  private _checkPlugin(plugin: IPluginClass) {
    const { pluginName, events = [], apis = [] } = plugin
    //名称检查
    if (this.pluginMap[pluginName]) {
      throw new Error(pluginName + '插件重复初始化')
    }
    events.forEach((eventName: string) => {
      if (this.customEvents.find(info => info === eventName)) {
        throw new Error(pluginName + '插件中' + eventName + '重复')
      }
    })

    apis.forEach((apiName: string) => {
      if (this.customApis.find(info => info === apiName)) {
        throw new Error(pluginName + '插件中' + apiName + '重复')
      }
    })
    return true
  }

  // 保存组件自定义事件与API
  private _saveCustomAttr(plugin: IPluginClass) {
    const { events = [], apis = [] } = plugin
    this.customApis = this.customApis.concat(apis)
    this.customEvents = this.customEvents.concat(events)
  }

  // 绑定hooks方法
  private _bindingHooks(plugin: IPluginTempl) {
    this.hooks.forEach(hookName => {
      /* const hook = plugin[hookName]
      if (hook) {
        this.hooksEntity[hookName].tapPromise(plugin.pluginName + hookName, function () {
          // eslint-disable-next-line prefer-rest-params
          return hook.apply(plugin, [...arguments])
        })
      } */
    })
  }

  // 绑定快捷键
  private _bindingHotkeys(plugin: IPluginTempl) {
    plugin?.hotkeys?.forEach((keyName: string) => {
      // 支持 keyup
      // hotkeys(keyName, { keyup: true }, e => plugin.hotkeyEvent(keyName, e))
    })
  }

  // 代理API事件
  private _bindingApis(pluginRunTime: IPluginTempl) {
    const { apis = [] } = pluginRunTime.constructor
    apis.forEach((apiName: string) => {
      this[apiName] = function () {
        // eslint-disable-next-line prefer-rest-params
        return pluginRunTime[apiName].apply(pluginRunTime, [...arguments])
      }
    })
  }
}

export default Editor
