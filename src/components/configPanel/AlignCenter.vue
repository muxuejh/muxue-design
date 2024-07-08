<template>
  <div class="config-item" v-if="editorStore.selectMode">
    <h2 class="title">居中对齐</h2>
    <div class="attr-item">
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

<style scoped lang="scss"></style>
