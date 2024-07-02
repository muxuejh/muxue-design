<template>
  <div v-if="editorStore.SelectMode" class="container">
    <el-tooltip content="水平居中">
      <SvgIcon class="icon" name="horizontally_center" @click="setPosition('centerH')" />
    </el-tooltip>
    <el-tooltip content="水平垂直居中">
      <SvgIcon class="icon" name="align_center" @click="setPosition('center')" />
    </el-tooltip>
    <el-tooltip content="垂直居中">
      <SvgIcon class="icon" name="vertical_center" @click="setPosition('centerV')" />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import useEditorStore from '@/stores/modules/editor'
import SvgIcon from '@/components/SvgIcon.vue'

const editorStore = useEditorStore()
const canvasEditor = editorStore.getCanvasEditor()!

const setPosition = (position: string) => {
  const activeObject = canvasEditor.canvas.getActiveObject()
  // @ts-ignore
  canvasEditor.position(position, activeObject)
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .icon {
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $sub-bg-color;
    cursor: pointer;
  }
}
</style>
