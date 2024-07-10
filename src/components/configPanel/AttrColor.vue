<template>
  <div
    class="config-item"
    v-if="editorStore.selectMode === 'one' && !hideType.includes(editorStore.selectType)"
  >
    <h2 class="title">颜色</h2>
    <el-popover placement="right" :width="320" trigger="click">
      <template #default>
        <ColorPanel
          v-model:color="color"
          textColor="#000"
          strawColor="#000"
          @update:color="setFabricObjectAttr"
        />
      </template>
      <template #reference>
        <div class="color-bar" :style="{ backgroundColor: color }"></div>
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fabric } from 'fabric'
import ColorPanel from '@/components/ColorPanel.vue'
import useEditorStore from '@/stores/modules/editor'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'

const editorStore = useEditorStore()

const hideType = ['line', 'path', 'group', 'image']

const color = ref('#000000')

const getObjectAttr = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    color.value = activeObject.fill as string
  }
}

const handleChange = (activeObject: fabric.Object | undefined) => {
  activeObject && activeObject.set('fill', color.value)
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss">
.color-bar {
  width: 100%;
  height: 35px;
  cursor: pointer;
}
</style>
