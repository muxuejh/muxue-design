<template>
  <div class="template">
    <div class="img-wrap" v-for="(img, index) in imgList" :key="index" @click="getTemplate(index)">
      <el-image :src="img" fit="contain" lazy />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { useFabricJson } from '@/hooks/useFabricJson'
import tempImg01 from '@/assets/images/tempImg01.png'
import tempImg02 from '@/assets/images/tempImg02.png'

const imgList = [tempImg01, tempImg02]

const { loadTemplate } = useFabricJson()

const getTemplate = (index: number) => {
  ElMessageBox.confirm('确定要导入模板到画布吗？会清空当前画布内容！', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    autofocus: false,
    showClose: false
  })
    .then(() => {
      loadTemplate(index)
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.template {
  display: flex;
  flex-wrap: wrap;
  .img-wrap {
    width: 50%;
    height: 180px;
    padding: 5px;
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: #f5f7fa;
      transition: all 0.3s ease-in-out;
    }
  }
}
</style>
