<template>
  <div class="color-panel">
    <div class="saturation-value" ref="saturationValueRef" @mousedown="mousedownSV">
      <div :style="`background-color: hsl(${hue}, 100%, 50%);`">
        <div class="point" :style="pointStyle"></div>
      </div>
      <div class="saturation-value-2"></div>
      <div class="saturation-value-3"></div>
    </div>
    <div class="color-panel-middle">
      <div style="flex: auto">
        <div class="hue-slider" ref="hueSliderRef" @mousedown="mousedownHue">
          <div class="slider" :style="hueSliderStyle"></div>
        </div>
        <div class="alpha-slider" ref="alphaSliderRef" @mousedown="mousedownAlpha">
          <div class="slider" :style="alphaSliderStyle"></div>
          <div
            :style="`background: linear-gradient(to right, rgba(0,0,0,0), ${colorObj.rgb});width: 100%;height: 100%`"
          ></div>
        </div>
      </div>
      <!-- <div class="color-diamond">
        <div :style="`background-color: ${colorObj.rgba};width: 100%;height: 100%;`"></div>
      </div> -->
    </div>
    <!-- <div class="color-value">
      <div class="hex">
        <label>
          <input :value="colorObj.hex8" @input="hexChange" spellcheck="false" />
        </label>
        <p>Hex</p>
      </div>
      <div class="rgba-r">
        <label>
          <input :value="red" @input="redChange" />
        </label>
        <p>R</p>
      </div>
      <div class="rgba-g">
        <label>
          <input :value="green" @input="greenChange" />
        </label>
        <p>G</p>
      </div>
      <div class="rgba-b">
        <label>
          <input :value="blue" @input="blueChange" />
        </label>
        <p>B</p>
      </div>
      <div class="rgba-a">
        <label>
          <input :value="alpha" @input="alphaChange" />
        </label>
        <p>A</p>
      </div>
    </div> -->
    <div class="color-value">
      <div style="display: flex">
        <div
          style="margin-right: 8px; margin-top: 3px; cursor: pointer"
          @click="handleOpenEyeDropper"
        >
          <SvgIcon name="straw" :color="strawColor" />
        </div>
        <div :style="{ color: textColor }">
          <span v-if="pointStyle !== 'top: 0;left: 0;'">{{ colorObj.rgba }}</span>
          <span v-else style="color: #999">请选择颜色~</span>
        </div>
      </div>

      <!-- 根据项目需要加的，可不要这一部分代码 -->
      <!--  <span :style="{ color: textColor }" style="cursor: pointer" @click="presetChange('#F0F2F5')">
        恢复默认
      </span> -->
    </div>
    <div class="preset-box">
      <span :style="{ color: textColor }">预设颜色</span>
      <ul class="preset">
        <li
          v-for="item in preset"
          :key="item"
          :style="`background-color: ${item}`"
          @click="presetChange(item)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { useEyeDropper } from '@vueuse/core'
import { ref, computed, watch, onMounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { rgbaToHexWithAlpha, rgbaToHex } from '@/utils/parseColor'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 可以传16进制也可以传rgba
  color: {
    type: String || Object,
    default() {
      return {
        r: 217,
        g: 128,
        b: 95
      }
    }
  },
  preset: {
    type: Array,
    default() {
      return [
        '#E02020',
        '#FA6401',
        '#F7B500',
        '#6DD400',
        '#44D7B6',
        '#32C5FF',
        '#0091FF',
        '#6236FF',
        '#B729E0',
        '#6D7278',
        '#E5E5E5',
        '#BFBFBF',
        '#7F7F7F',
        '#262626',
        '#000000',
        '#FFFFFF'
      ]
    }
  },
  textColor: {
    type: String,
    default: '#000000'
  },
  strawColor: {
    type: String,
    default: '#FFFFFF'
  }
})

const emit = defineEmits(['update:color'])

const saturationValueRef = ref(null)
const hueSliderRef = ref(null)
const alphaSliderRef = ref(null)

let pointStyle = ref('top: 0;left: 0;')
let hueSliderStyle = ref('left: 0;')
let alphaSliderStyle = ref('left: calc(100% - 20px);')

let hue = ref(0)
let saturation = ref(1)
let value = ref(1)

let red = ref(255)
let green = ref(0)
let blue = ref(0)
let alpha = ref(1)

watch(
  () => props.color,
  newColor => {
    if (newColor) {
      let color

      if (props.color.includes('#')) {
        color = props.color
      } else if (props.color.includes('rgba')) {
        color = rgbaToHexWithAlpha(props.color)
      } else if (props.color.includes('rgb')) {
        color = rgbaToHex(props.color)
      } else {
        ElMessage.error('颜色格式不正确')
      }

      let { r, g, b, a } = parseColor(color)

      red.value = r
      green.value = g
      blue.value = b
      alpha.value = a
    } else {
      red.value = null
      green.value = null
      blue.value = null
      alpha.value = 1
      alphaSliderStyle.value = 'left: calc(100% - 20px);'
      pointStyle.value = `top: 0;left: 0;`
    }
  }
)

onMounted(() => {
  if (props.color) {
    let color

    if (props.color.includes('#')) {
      color = props.color
    } else if (props.color.includes('rgba')) {
      color = rgbaToHexWithAlpha(props.color)
    } else if (props.color.includes('rgb')) {
      color = rgbaToHex(props.color)
    } else {
      ElMessage.error('颜色格式不正确')
    }

    let { r, g, b, a } = parseColor(color)

    red.value = r
    green.value = g
    blue.value = b
    alpha.value = a
  }
})

const { open, sRGBHex, isSupported } = useEyeDropper()
//处理打开滴管时候按Esc按钮报错
const handleOpenEyeDropper = () => {
  ElMessage.success('请点击屏幕上的颜色，按Esc退出')
  try {
    open()
  } catch (error) {
    console.error('Error while opening EyeDropper:', error)
  }
}
watch(
  () => sRGBHex.value,
  newVal => {
    if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(newVal)) {
      let { r, g, b, a } = hex2rgba(newVal)
      red.value = r
      green.value = g
      blue.value = b
      alpha.value = a
    }
  }
)

watch([red, green, blue], newValue => {
  if (newValue[0] == null || newValue[1] == null || newValue[2] == null) return
  if (alpha.value === 0) {
    emit('update:color', `rgba(${red.value},${green.value},${blue.value},${alpha.value})`)
  } else {
    emit('update:color', rgba2hex(red.value, green.value, blue.value, alpha.value))
  }

  let { h, s, v } = rgb2hsv(red.value, green.value, blue.value)

  hue.value = h
  saturation.value = s
  value.value = v

  // 移动背景板圆圈
  pointStyle.value = `top: ${100 - v * 100}%;left: ${s * 100}%;`
  // 移动色调滑块
  hueSliderStyle.value = `left: ${(hue.value / 360) * 100}%;`
})

watch(alpha, () => {
  if (!props.color) return
  if (alpha.value === 0) {
    emit('update:color', `rgba(${red.value},${green.value},${blue.value},${alpha.value})`)
  } else {
    emit('update:color', rgba2hex(red.value, green.value, blue.value, alpha.value))
  }

  // 移动透明度滑块
  alphaSliderStyle.value = `left: ${
    alpha.value >= 1 ? 'calc(100% - 20px)' : alpha.value * 100 + '%'
  };`
})

let colorObj = computed(() => {
  let r = red.value
  let g = green.value
  let b = blue.value
  let a = parseFloat(alpha.value.toFixed(2))
  let h = hue.value
  let s = saturation.value
  let v = value.value
  return {
    rgb: `rgba(${r},${g},${b})`,
    rgba: `rgba(${r},${g},${b},${a})`,
    hex6: rgba2hex(r, g, b),
    hex8: rgba2hex(r, g, b, a),
    hsv: `hsv(${h},${s},${v})`,
    hsl: ``
  }
})

/**
 * 输入框值变化,限制输入的值
 * @param {*} e
 */
function hexChange(e) {
  let v = e.target.value
  if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)) {
    let { r, g, b, a } = hex2rgba(v)
    red.value = r
    green.value = g
    blue.value = b
    alpha.value = a
  }
}

function redChange(e) {
  let v = e.target.value
  if (v !== '') {
    v > 255 && (red.value = 255)
    v < 0 && (red.value = 0)
    v >= 0 && v <= 255 && (red.value = parseInt(v))
  }
}

function greenChange(e) {
  let v = e.target.value
  if (v !== '') {
    v > 255 && (green.value = 255)
    v < 0 && (green.value = 0)
    v >= 0 && v <= 255 && (green.value = parseInt(v))
  }
}

function blueChange(e) {
  let v = e.target.value
  if (v !== '') {
    v > 255 && (blue.value = 255)
    v < 0 && (blue.value = 0)
    v >= 0 && v <= 255 && (blue.value = parseInt(v))
  }
}

function alphaChange(e) {
  let v = e.target.value
  if (v !== '') {
    v = parseFloat(v)
    alpha.value = v
    v > 1 && (alpha.value = 1)
    v < 0 && (alpha.value = 0)
    v >= 0 && v <= 1 && (alpha.value = v)
  }
}

/**
 * 点击预设方块事件
 * @param {*} item
 */
function presetChange(item) {
  if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(item)) {
    let { r, g, b, a } = hex2rgba(item)
    red.value = r
    green.value = g
    blue.value = b
    alpha.value = a
  }
}

/**
 * 饱和度和亮度
 * @param {*} e
 */
function handleChangeSV(e) {
  let w = saturationValueRef.value.clientWidth
  let h = saturationValueRef.value.clientHeight
  let x = e.pageX - saturationValueRef.value.getBoundingClientRect().left
  let y = e.pageY - saturationValueRef.value.getBoundingClientRect().top
  x = x < w && x > 0 ? x : x > w ? w : 0
  y = y < h && y > 0 ? y : y > h ? h : 0
  if (x - 12 < 0) {
    x = 0 + 6
  } else if (x + 12 > w) {
    x = w - 6
  }
  if (y - 12 < 0) {
    y = 0 + 6
  } else if (y + 12 > h) {
    y = h - 6
  }
  // 计算饱和度和亮度
  saturation.value = Math.floor((x / w) * 100 + 0.5) / 100
  value.value = Math.floor((1 - y / h) * 100 + 0.5) / 100
  // hsv转化为rgb
  let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value)
  red.value = r
  green.value = g
  blue.value = b
  // 移动背景板圆圈
  pointStyle.value = `top: ${y}px;left: ${x}px;`
}

function mousedownSV(e) {
  // 鼠标按下计算饱和度和亮度并添加事件
  handleChangeSV(e)
  // 添加整个页面的鼠标事件
  window.addEventListener('mousemove', handleChangeSV)
  window.addEventListener('mouseup', mouseupSV)
}

function mouseupSV(e) {
  // 鼠标松开后移除事件
  window.removeEventListener('mousemove', handleChangeSV)
  window.removeEventListener('mouseup', mouseupSV)
}

/**
 * 色调
 * @param {*} e
 */
function handleChangeHue(e) {
  let w = hueSliderRef.value.clientWidth
  let x = e.pageX - saturationValueRef.value.getBoundingClientRect().left
  x = x < w && x > 0 ? x : x > w ? w : 0
  // 计算色调
  hue.value = Math.floor((x / w) * 360 + 0.5)
  // hsv转化为rgb
  let { r, g, b } = hsv2rgb(hue.value, saturation.value, value.value)
  red.value = r
  green.value = g
  blue.value = b
  // 移动滑块
  hueSliderStyle.value = `left: ${x >= w - 20 ? w - 20 : x}px;`
}

function mousedownHue(e) {
  handleChangeHue(e)
  window.addEventListener('mousemove', handleChangeHue)
  window.addEventListener('mouseup', mouseupHue)
}

function mouseupHue(e) {
  window.removeEventListener('mousemove', handleChangeHue)
  window.removeEventListener('mouseup', mouseupHue)
}

/**
 * 透明度
 * @param {*} e
 */
function handleChangeAlpha(e) {
  let w = alphaSliderRef.value.clientWidth
  let x = e.pageX - saturationValueRef.value.getBoundingClientRect().left
  x = x < w && x > 0 ? x : x > w ? w : 0
  // 计算透明度
  alpha.value = Math.floor((x / w) * 100 + 0.5) / 100
  // 移动滑块
  alphaSliderStyle.value = `left: ${x >= w - 20 ? w - 20 : x}px;`
}

function mousedownAlpha(e) {
  handleChangeAlpha(e)
  window.addEventListener('mousemove', handleChangeAlpha)
  window.addEventListener('mouseup', mouseupAlpha)
}

function mouseupAlpha(e) {
  window.removeEventListener('mousemove', handleChangeAlpha)
  window.removeEventListener('mouseup', mouseupAlpha)
}

/**
 * 解析输入的数据,只能解析hex颜色和rgb对象形式的数据
 * @param color
 */
function parseColor(color) {
  if (color) {
    let r, g, b, a
    if (typeof color === 'string') {
      if (/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{8}|[0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/.test(color)) {
        return hex2rgba(color)
      }
    } else {
      r = color.r > 255 ? 255 : color.r < 0 ? 0 : color.r
      g = color.g > 255 ? 255 : color.g < 0 ? 0 : color.g
      b = color.b > 255 ? 255 : color.b < 0 ? 0 : color.b
      a = color.a > 1 ? 1 : color.a < 0 ? 0 : color.a
      return { r, g, b, a }
    }
  } else {
    return null
  }
}

function hsv2rgb(h, s, v) {
  h === 360 && (h = 0)
  let i = Math.floor(h / 60) % 6
  let f = h / 60 - i
  let p = v * (1 - s)
  let q = v * (1 - s * f)
  let t = v * (1 - s * (1 - f))
  let r, g, b
  if (i === 0) {
    r = v
    g = t
    b = p
  } else if (i === 1) {
    r = q
    g = v
    b = p
  } else if (i === 2) {
    r = p
    g = v
    b = t
  } else if (i === 3) {
    r = p
    g = q
    b = v
  } else if (i === 4) {
    r = t
    g = p
    b = v
  } else if (i === 5) {
    r = v
    g = p
    b = q
  }
  r = Math.floor(r * 255 + 0.5)
  g = Math.floor(g * 255 + 0.5)
  b = Math.floor(b * 255 + 0.5)
  return { r, g, b }
}

function rgb2hsv(r, g, b) {
  let r1 = r / 255
  let g1 = g / 255
  let b1 = b / 255
  let cmax = Math.max(r1, g1, b1)
  let cmin = Math.min(r1, g1, b1)
  let d = cmax - cmin
  let h, s, v
  if (d === 0) {
    h = 0
  } else if (cmax === r1) {
    h = ((60 * (g1 - b1)) / d + 360) % 360
  } else if (cmax === g1) {
    h = 60 * ((b1 - r1) / d + 2)
  } else if (cmax === b1) {
    h = 60 * ((r1 - g1) / d + 4)
  }
  if (cmax === 0) {
    s = 0
  } else {
    s = d / cmax
  }
  v = cmax
  h = Math.floor(h + 0.5)
  s = Math.floor(s * 100 + 0.5) / 100
  v = Math.floor(v * 100 + 0.5) / 100
  return { h, s, v }
}

function rgba2hex(r, g, b, a = 1) {
  r = parseInt(r)
  let r1 = r.toString(16).length !== 2 ? '0' + r.toString(16) : r.toString(16)
  g = parseInt(g)
  let g1 = g.toString(16).length !== 2 ? '0' + g.toString(16) : g.toString(16)
  b = parseInt(b)
  let b1 = b.toString(16).length !== 2 ? '0' + b.toString(16) : b.toString(16)
  a = parseFloat(a)
  let a1 = ''
  if (a !== 1) {
    let temp = Math.floor(256 * a)
    a1 = temp.toString(16).length !== 2 ? '0' + temp.toString(16) : temp.toString(16)
  }
  return `#${r1}${g1}${b1}${a1}`.toUpperCase()
}

function hex2rgba(s) {
  if (/^#?[0-9a-fA-F]{3}$/.test(s)) {
    let b = s.substring(s.length - 1, s.length)
    let g = s.substring(s.length - 2, s.length - 1)
    let r = s.substring(s.length - 3, s.length - 2)
    return hex2rgba(`${r + r}${g + g}${b + b}`)
  }
  if (/^#?[0-9a-fA-F]{4}$/.test(s)) {
    let a = s.substring(s.length - 1, s.length)
    let b = s.substring(s.length - 2, s.length - 1)
    let g = s.substring(s.length - 3, s.length - 2)
    let r = s.substring(s.length - 4, s.length - 3)
    return hex2rgba(`${r + r}${g + g}${b + b}${a + a}`)
  }
  if (/^#?[0-9a-fA-F]{6}$/.test(s)) {
    let b = parseInt('0x' + s.substring(s.length - 2, s.length))
    let g = parseInt('0x' + s.substring(s.length - 4, s.length - 2))
    let r = parseInt('0x' + s.substring(s.length - 6, s.length - 4))
    return { r, g, b, a: 1 }
  }
  if (/^#?[0-9a-fA-F]{8}$/.test(s)) {
    let a = parseInt('0x' + s.substring(s.length - 2, s.length))
    a = a / 255
    let b = parseInt('0x' + s.substring(s.length - 4, s.length - 2))
    let g = parseInt('0x' + s.substring(s.length - 6, s.length - 4))
    let r = parseInt('0x' + s.substring(s.length - 8, s.length - 6))
    return { r, g, b, a }
  }
}
</script>

<style scoped>
.color-panel {
  position: relative;
  user-select: none;
  width: 100%;
}

/* 饱和度和亮度 */
.saturation-value {
  cursor: pointer;
  width: 100%;
  height: 200px;
  position: relative;
  margin-bottom: 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

.saturation-value > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 圆圈 */
.point {
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  background: transparent;
  border-radius: 50%;
  border: 2px solid #ffffff;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 9;
}

.saturation-value-2 {
  background: linear-gradient(to right, white, #ffffff00);
}

.saturation-value-3 {
  background: linear-gradient(to top, black, #ffffff00);
}

/* 色调 透明度 */
.color-panel-middle {
  width: 100%;
  display: flex;
  margin: 20px 0 10px 0;
}

/* 色调滑块条 */
.hue-slider {
  position: relative;
  margin-bottom: 6px;
  height: 20px;
  background: linear-gradient(90deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
}

/* 透明度滑块条 */
.alpha-slider {
  position: relative;
  height: 20px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  background: #fff
    url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==');
  background-size: 10px 10px;
}

/* 滑块 */
.slider {
  position: absolute;
  /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.6); */
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid #ffffff;
}

/* 颜色方块 */
.color-diamond {
  position: relative;
  margin-left: 5px;
  width: 26px;
  height: 26px;
  border-radius: 3px;
  overflow: hidden;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWElEQVRIiWM8fubkfwYygKWJOSM5+mCAhRLNoxaPWjxq8ajFoxbTyeL/DAfJ0Xjs3Cl7Siwmu4Yht1aDgZEYx6MWj1o8avGoxaMWD3qLya5X//4nqx6HAQC7RBGFzolqTAAAAABJRU5ErkJggg==');
  background-size: 10px 10px;
}

/* 颜色的值 hex rgba
.color-value {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.color-value div {
  padding: 0 3px;
  text-align: center;
}
.color-value input {
  font-size: 12px;
  box-sizing: border-box;
  width: 34px;
  height: 24px;
  padding: 0;
  margin: 0;
  outline: none;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
}
.color-value p {
  font-size: 12px;
  margin: 3px 0 0;
}
.color-value .rgba-a {
  padding-right: 0;
}
.color-value .hex {
  flex: 1;
  padding-left: 0;
}
.color-value .hex input {
  width: 100%;
  height: 24px;
} */
.color-value {
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: space-between;
}

.preset-box {
  padding: 15px 0;
  /* border-bottom: 1px solid rgba(255, 255, 255, 0.4); */
}
/* 预设颜色  */
.preset {
  width: 100%;
  padding: 0;
  margin-top: 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: flex-start; */
}

.preset li {
  width: 22px;
  height: 22px;
  margin-right: 16px;
  margin-bottom: 10px;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
}
.preset li:nth-child(8),
.preset li:nth-child(16) {
  margin-right: 0;
}
</style>
