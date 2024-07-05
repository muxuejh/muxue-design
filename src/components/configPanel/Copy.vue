<template>
  <el-tooltip content="复制">
    <SvgIcon class="icon" name="copy" @click="useCopy" />
  </el-tooltip>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import useCopy from '@/hooks/useCopy'
</script>

<style scoped lang="scss"></style>
