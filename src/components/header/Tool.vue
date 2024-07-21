<template>
  <div class="flex-1 mx-32 flex items-center justify-center gap-4">
    <div @click="handleClear" class="tool">
      <SvgIcon name="brush" />
    </div>
    <div @click="handleToggleRuler" class="tool" :class="{ 'bg-gray-200': rulerSwitch }">
      <SvgIcon name="ruler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useTools } from '@/hooks/useTools'

const { clear, toggleRuler } = useTools()
const handleClear = () => {
  ElMessageBox.confirm('确定要清空画布吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    autofocus: false,
    showClose: false
  })
    .then(() => {
      clear()
    })
    .catch(() => {})
}

const rulerSwitch = ref(true)
const handleToggleRuler = () => {
  rulerSwitch.value = !rulerSwitch.value
  toggleRuler(rulerSwitch.value)
}
</script>

<style scoped lang="scss">
.tool {
  @apply w-8 h-8 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200;
}
</style>
