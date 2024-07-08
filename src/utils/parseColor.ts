/**
 * 颜色值转换
 * @param rgb rgb(255, 255, 255)
 * @returns
 */
function rgbToHex1(rgb: any) {
  if (typeof rgb === 'string') {
    rgb = parseRgbString(rgb)
  }
  return (
    '#' +
    rgb
      .map(function (c: any) {
        var hex = c.toString(16)
        return hex.length == 1 ? '0' + hex : hex
      })
      .join('')
  )
}

/**
 *  颜色值转换
 * @param rgb 数组或对象 {r: 0, g: 0, b: 0} [0, 0, 0]
 * @returns
 */
function rgbToHex2(rgb: any) {
  return (
    '#' +
    [rgb.r, rgb.g, rgb.b]
      .map(function (c) {
        var hex = c.toString(16)
        return hex.length == 1 ? '0' + hex : hex
      })
      .join('')
  )
}

function parseRgbString(rgbString: string) {
  var match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  return match ? [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)] : null
}

export { rgbToHex1, rgbToHex2 }
