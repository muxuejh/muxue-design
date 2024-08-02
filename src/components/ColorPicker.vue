<template>
  <div>
    <el-popover placement="right" :width="320" :hide-after="0" trigger="click">
      <template #default>
        <ColorPanel
          v-model:color="colorVal"
          textColor="#000"
          strawColor="#000"
          @update:color="handleColorUpdate"
        />
      </template>
      <template #reference>
        <div class="color-picker" :style="{ width: props.width + 'px' }">
          <div
            class="color-bar"
            :class="{ 'transparent-bg': isColorTransparent }"
            :style="{ backgroundColor: colorVal }"
          ></div>
          <SvgIcon name="palette" />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ColorPanel from '@/components/ColorPanel.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  color: {
    type: String,
    default() {
      return '#000000'
    }
  },
  width: {
    type: Number,
    default: 100
  }
})

const colorVal = ref(props.color)
watch(
  () => props.color,
  newColor => {
    colorVal.value = newColor
  }
)

const emit = defineEmits(['update:color'])
const handleColorUpdate = (value: string) => {
  colorVal.value = value
  emit('update:color', colorVal.value)
}

// 判断颜色是否为透明，或者没有颜色值
const isColorTransparent = computed(() => {
  if (!colorVal.value) return true

  // 处理16进制颜色值
  if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(colorVal.value)) {
    // 16进制颜色没有透明度概念，所以直接返回false
    return false
  }

  // 处理RGB和RGBA颜色值
  const match = colorVal.value.match(
    /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(\s*,\s*(\d{1}(?:\.\d+)?))?\)$/
  )
  if (!match) {
    // 如果不匹配RGB或RGBA格式，则返回false或抛出错误
    return false // 或者 throw new Error('Invalid colorVal.value format');
  }

  // 解析颜色值和透明度
  const [, r, g, b, , a = '1'] = match // 如果没有透明度（即RGBA中的A），默认为1
  const alpha = parseFloat(a)

  // 判断透明度是否为0
  return alpha === 0
})
</script>

<style scoped lang="scss">
.color-picker {
  margin-top: 5px;
  padding: 5px;
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
  .color-bar {
    flex: 1;
    height: 100%;
    margin-right: 5px;
    border: 1px solid $border-color;
  }
}
</style>
