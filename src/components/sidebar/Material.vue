<template>
  <div class="material">
    <div
      class="img-wrap"
      v-for="(img, index) in dataStore.MaterialList"
      :key="index"
      @click="addImage(img)"
      @dragend="e => handleDrag(img, e)"
    >
      <el-image :src="img" fit="contain" lazy />
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataStore from '@/stores/modules/data'
import useAddImage from '@/hooks/useAddImage'
import useCalcDrag from '@/hooks/useCalcDrag'

const dataStore = useDataStore()
const { isOutsideCanvas } = useCalcDrag()
const { addImage } = useAddImage()

const handleDrag = (img: string, e: DragEvent) => {
  if (isOutsideCanvas(e.clientX, e.clientY)) return
  addImage(img, { event: e })
}
</script>

<style scoped lang="scss">
.material {
  display: flex;
  flex-wrap: wrap;
  .img-wrap {
    width: 50%;
    height: 145px;
    padding: 5px;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: #f5f7fa;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;
      /* &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
      } */
    }
  }
}
</style>
