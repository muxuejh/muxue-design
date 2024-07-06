<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">位置尺寸</h2>
    <div class="ipt-box">
      <el-input
        v-model.number="objectAttrs.left"
        @change="(value: Number) => setFabricObjectAttr('left', Number(value))"
      >
        <template #prefix>X</template>
      </el-input>
      <el-input
        v-model="objectAttrs.top"
        @change="(value: Number) => setFabricObjectAttr('top', Number(value))"
      >
        <template #prefix>Y</template>
      </el-input>
    </div>
    <div class="ipt-box">
      <el-input
        v-model.number="objectAttrs.width"
        @change="(value: Number) => setFabricObjectAttr('width', Number(value))"
      >
        <template #prefix>W</template>
      </el-input>
      <el-input
        v-model="objectAttrs.height"
        @change="(value: Number) => setFabricObjectAttr('height', Number(value))"
      >
        <template #prefix>H</template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'

const editorStore = useEditorStore()

const objectAttrs = reactive({
  left: 0,
  top: 0,
  width: 0,
  height: 0
})

const getObjectAttr = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    objectAttrs.left = Number(activeObject.get('left')!.toFixed(2))
    objectAttrs.top = Number(activeObject.get('top')!.toFixed(2))
    objectAttrs.width = Number((activeObject.get('width')! * activeObject.scaleX!).toFixed(2))
    objectAttrs.height = Number((activeObject.get('height')! * activeObject.scaleY!).toFixed(2))
  }
}

const handleChange = (activeObject: fabric.Object | undefined, key: any, value: number) => {
  activeObject && activeObject.set(key, value)
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss">
.ipt-box {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
  :deep(.el-input) {
    width: 140px;
  }
  :deep(.el-input__wrapper) {
    height: 35px;
  }
  :deep(.el-input__inner) {
    text-align: center;
  }
}
</style>
