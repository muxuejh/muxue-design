<template>
  <el-popover placement="right" :width="320" trigger="click">
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
        <div class="color-bar" :style="{ backgroundColor: colorVal }"></div>
        <SvgIcon name="palette" />
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ColorPanel from '@/components/ColorPanel.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
  color: {
    type: String,
    default() {
      return '#000'
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
  emit('update:color', colorVal)
}
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
  }
}
</style>