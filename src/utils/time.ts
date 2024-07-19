/**
 * 获取当前时间
 * @param separator 日期分隔符
 * @returns
 */
export const getCurrentTime = (separator: string = '') => {
  const now = new Date()
  const currentTime = `${now.getFullYear()}${separator}${(now.getMonth() + 1).toString().padStart(2, '0')}${separator}${now.getDate().toString().padStart(2, '0')}${separator}${now.getHours().toString().padStart(2, '0')}${separator}${now.getMinutes().toString().padStart(2, '0')}${separator}${now.getSeconds().toString().padStart(2, '0')}`
  return currentTime
}
