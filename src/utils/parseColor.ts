/**
 * rgba ==> 16进制
 * @param rgba rgba(255,255,255,1) / [255, 255, 255, 0.5]
 * @returns
 */
function rgbaToHexWithAlpha(rgba) {
  if (typeof rgba !== 'string' || !rgba.startsWith('rgba(')) {
    throw new Error(
      'Invalid rgba format. String must start with "rgba(" and be a valid rgba string.'
    )
  }

  // 使用正则表达式匹配 rgba 内的值
  const match = rgba.match(/\d+(\.\d+)?/g)
  if (!match || match.length !== 4) {
    throw new Error('Invalid rgba string format. Expected 4 values.')
  }

  // 提取 RGB 和 Alpha 值，并四舍五入 RGB 为整数
  const [r, g, b, a] = match.map(Number).map((x, i) => (i < 3 ? Math.round(x) : x))

  // Alpha 值需要是 0-1 范围内的浮点数，但如果是 1 或接近 1 的整数，则视为 1
  const alphaHex =
    a >= 1
      ? 'ff'
      : Math.round(a * 255)
          .toString(16)
          .padStart(2, '0')

  // 转换 r, g, b 到 16 进制并拼接，最后加上 alphaHex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${alphaHex}`
}

/**
 * rgb ==> 16进制
 * @param rgb rgb(255,255,255) / [255, 255, 255]
 * @returns
 */
function rgbaToHex(rgba) {
  // 处理字符串格式
  if (typeof rgba === 'string') {
    // 提取rgb部分，并去除空格，然后转换为整数
    const rgb = rgba
      .match(/\d+(\.\d+)?/g)
      .slice(0, 3)
      .map(x => Math.round(parseFloat(x)))
    // 转换rgb到16进制
    return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`
  }
  // 处理数组格式
  else if (Array.isArray(rgba) && rgba.length === 4) {
    // 确保所有值都是整数（四舍五入）
    const rgb = rgba.slice(0, 3).map(x => Math.round(x))
    // 转换rgb到16进制
    return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`
  }

  throw new Error('Invalid rgba format')
}

export { rgbaToHexWithAlpha, rgbaToHex }
