import { getCurrentTime } from './time'

/**
 * 下载base64文件
 * @param fileStr
 * @param fileType
 */
export function downloadByBase64(fileStr: string, fileType: string = 'png') {
  const link = document.createElement('a')
  link.href = fileStr
  link.download = `${getCurrentTime()}.${fileType}`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
