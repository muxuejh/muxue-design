import { ElLoading } from 'element-plus'

/* 全局请求 loading */
let loadingInstance: ReturnType<typeof ElLoading.service>

/**
 * @description 开启 Loading
 * */
const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '数据加载中...',
    background: 'rgba(255, 255, 255, 0.9)'
  })
}

/**
 * @description 结束 Loading
 * */
const endLoading = () => {
  loadingInstance.close()
}

/**
 * @description 显示全屏加载
 * */
let needLoadingRequestCount = 0
export const showFullScreenLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

/**
 * @description 隐藏全屏加载
 * */
export const hideFullScreenLoading = () => {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
