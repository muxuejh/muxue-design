<template>
  <div class="header-container"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header-container {
  width: 100%;
  height: $header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 23px;
  background: $heder-bg;
  // background: linear-gradient(90deg, $header-bg-left 0%, $header-bg-right 100%);
  // box-shadow: 1px 0 10px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid #eef2f8;
}
</style>
