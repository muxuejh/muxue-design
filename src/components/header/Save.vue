<template>
  <div class="mr-1">
    <el-dropdown @command="handleCommand">
      <el-button type="primary">
        下载
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="saveImg">PNG图片</el-dropdown-item>
          <el-dropdown-item command="saveSvg">SVG图片</el-dropdown-item>
          <el-dropdown-item command="saveJson">保存为JSON</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useSave } from '@/hooks/useSave'

const { saveImg, saveSvg, saveJson, isEmptyWorkspace } = useSave()

const handleCommand = (command: string | number | object) => {
  if (isEmptyWorkspace()) {
    return ElMessage.warning('画布内容为空！')
  }
  if (command === 'saveImg') saveImg()
  if (command === 'saveSvg') saveSvg()
  if (command === 'saveJson') saveJson()
}
</script>

<style scoped lang="scss"></style>
