<template>
  <div class="absolute bottom-8 right-2">
    <el-button-group>
      <el-button :icon="ZoomOut" @click="small" />
      <el-button :icon="ZoomIn" @click="big" />
      <el-button :icon="RefreshLeft" @click="auto" />
    </el-button-group>
  </div>
</template>

<script setup lang="ts">
import Editor from '@/core'
import { ZoomOut, ZoomIn, RefreshLeft } from '@element-plus/icons-vue'
import { inject } from 'vue'

const canvasEditor = inject('canvasEditor') as Editor

const big = () => {
  canvasEditor.big()
}

const small = () => {
  canvasEditor.small()
}

const auto = () => {
  canvasEditor.auto()
}
</script>

<style scoped lang="scss"></style>
