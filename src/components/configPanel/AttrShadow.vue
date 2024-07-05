<template>
  <div class="config-item" v-if="editorStore.SelectMode === 'one'">
    <h2 class="title">阴影</h2>
    <div class="box">
      <div class="label">半径</div>
      <el-slider
        v-model="attts.shadow.blur"
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
        v-model="attts.shadow.offsetX"
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
        v-model="attts.shadow.offsetY"
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
      <ColorPicker v-model:color="attts.shadow.color" @update:color="setFabricObjectAttr" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { fabric } from 'fabric'
import useEditorStore from '@/stores/modules/editor'
import ColorPicker from '@/components/ColorPicker.vue'
import useFabricObjectAttr from '@/hooks/useFarbicObjectAttr'

const editorStore = useEditorStore()

const attts = reactive({
  shadow: {
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    color: '#000000'
  }
})

const getObjectAttr = (activeObject: fabric.Object) => {
  if (activeObject) {
    // @ts-ignore
    attts.shadow = activeObject.get('shadow') || {}
    if (!attts.shadow.color) {
      attts.shadow.color = '#000000'
    }
  }
}

const handleChange = (activeObject: fabric.Object) => {
  if (activeObject) {
    activeObject.set('shadow', new fabric.Shadow(attts.shadow))
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
