/**
 * rgba ==> 16进制
 * @param rgba rgba(255,255,255,1) / [255, 255, 255, 0.5]
 * @returns
 */
function rgbaToHexWithAlpha(rgba) {
  let r, g, b, a

  // 处理字符串形式的 rgba
  if (typeof rgba === 'string') {
    const values = rgba.match(/\d+(\.\d+)?/g).map(Number)
    ;[r, g, b, a] = values
    a = Math.round(a * 255) // 将透明度从 0-1 转换为 0-255
  }
  // 处理数组形式的 rgba
  else if (Array.isArray(rgba) && rgba.length === 4) {
    ;[r, g, b, a] = rgba
    if (a < 1) {
      a = Math.round(a * 255) // 如果透明度不是 1，则转换为 0-255
    } else {
      a = 255 // 如果透明度是 1（或接近 1），则直接使用 255
    }
  } else {
    throw new Error('Invalid rgba format')
  }

  // 转换 r, g, b, a 到 16 进制并拼接
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a.toString(16).padStart(2, '0')}`
}

/**
 * rgb ==> 16进制
 * @param rgba rgba(255,255,255,1) / [255, 255, 255, 1]
 * @returns
 */
function rgbaToHex(rgba) {
  // 假设rgba是一个字符串，如'rgba(255,255,255,1)'
  // 或者你可以传递一个数组，如[255, 255, 255, 1]
  // 这里我们处理字符串
  if (typeof rgba === 'string') {
    // 提取rgb部分，并去除空格
    const rgb = rgba.match(/\d+/g).slice(0, 3).map(Number)
    // 转换rgb到16进制
    return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`
  } else if (Array.isArray(rgba) && rgba.length === 4) {
    // 如果rgba是一个数组
    return `#${rgba
      .slice(0, 3)
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')}`
  }
  throw new Error('Invalid rgba format')
}

export { rgbaToHexWithAlpha, rgbaToHex }
