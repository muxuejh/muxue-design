<template>
  <div class="canvas-editor-container"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.canvas-editor-container {
  flex: 1;
  height: 100%;
  background-size: 30px 30px;
  background-position:
    0 0,
    15px 15px;
  background-image: linear-gradient(45deg, #eee 25%, transparent 0, transparent 75%, #eee 0, #eee),
    linear-gradient(45deg, #eee 25%, #fff 0, #fff 75%, #eee 0, #eee);
}
</style>
