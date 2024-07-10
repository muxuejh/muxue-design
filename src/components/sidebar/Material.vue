<template>
  <div class="material">
    <div
      class="img-wrap"
      v-for="(img, index) in imgList"
      :key="index"
      @click="useAddImage(img)"
      @dragend="e => handleDrag(img, e)"
    >
      <el-image :src="img" fit="contain" lazy />
    </div>
  </div>
</template>

<script setup lang="ts">
import useAddImage from '@/hooks/useAddImage'
import useCalcDrag from '@/hooks/useCalcDrag'
import img01 from '@/assets/images/01.png'
import img02 from '@/assets/images/02.png'
import img03 from '@/assets/images/03.png'
import img04 from '@/assets/images/04.png'
import img05 from '@/assets/images/05.png'
import img06 from '@/assets/images/06.png'
import img07 from '@/assets/images/07.png'
import img08 from '@/assets/images/08.png'
import img09 from '@/assets/images/09.png'
import img10 from '@/assets/images/10.png'
import img11 from '@/assets/images/11.png'
import img12 from '@/assets/images/12.png'
import img13 from '@/assets/images/13.png'
import img14 from '@/assets/images/14.png'
import img15 from '@/assets/images/15.png'
import img16 from '@/assets/images/16.png'
import img17 from '@/assets/images/17.png'

const { isOutsideCanvas } = useCalcDrag()

const imgList = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  img08,
  img09,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17
]

const handleDrag = (img: string, e: DragEvent) => {
  if (isOutsideCanvas(e.clientX, e.clientY)) return
  useAddImage(img, { event: e })
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
