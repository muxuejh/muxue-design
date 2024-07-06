<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">阴影</h2>
    <div class="box">
      <div class="label">半径</div>
      <el-slider
        v-model="objectAttrs.shadow.blur"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="setFabricObjectAttr"
      />
    </div>
    <div class="box">
      <div class="label">水平</div>
      <el-slider
        v-model="objectAttrs.shadow.offsetX"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="setFabricObjectAttr"
      />
    </div>
    <div class="box">
      <div class="label">垂直</div>
      <el-slider
        v-model="objectAttrs.shadow.offsetY"
        :min="0"
        :max="10"
        :step="1"
        show-input
        :show-input-controls="false"
        @input="setFabricObjectAttr"
      />
    </div>
    <div class="box color-box">
      <div class="label">颜色</div>
      <ColorPicker v-model:color="objectAttrs.shadow.color" @update:color="setFabricObjectAttr" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import ColorPicker from '@/components/ColorPicker.vue'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'

const editorStore = useEditorStore()

const objectAttrs = reactive({
  shadow: {
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000000'
  }
})

const getObjectAttr = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    // @ts-ignore
    objectAttrs.shadow = activeObject.get('shadow') || {}
    if (!objectAttrs.shadow.color) {
      objectAttrs.shadow.color = '#000000'
    }
  }
}

const handleChange = (activeObject: fabric.Object | undefined) => {
  if (activeObject) {
    activeObject.set('shadow', new fabric.Shadow(objectAttrs.shadow))
  }
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss">
.box {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.color-box {
    justify-content: flex-start;
    .label {
      width: 60px;
    }
  }
}
</style>
