<template>
  <el-tooltip content="删除">
    <el-icon class="icon" @click="useDelete"><DeleteFilled /></el-icon>
  </el-tooltip>
</template>

<script setup lang="ts">
import { DeleteFilled } from '@element-plus/icons-vue'
import useDelete from '@/hooks/useDelete'
</script>

<style scoped lang="scss"></style>
