<template>
  <div v-if="editorStore.selectMode === 'one' && editorStore.selectType === 'image'">
    <el-button
      class="w-full h-10 mb-6 border-none bg-gray-200 rounded-lg text-gray-800"
      @click="dialogVisible = true"
    >
      替换图片
    </el-button>
    <el-dialog v-model="dialogVisible" title="" width="55%" :show-close="false">
      <template #header></template>
      <div class="h-full relative">
        <div
          @click="dialogVisible = false"
          class="px-1 absolute top-3 right-4 z-10 cursor-pointer hover:text-blue-600"
        >
          <el-icon size="18"><CloseBold /></el-icon>
        </div>
        <el-tabs tab-position="left" style="height: 100%">
          <el-tab-pane label="图片库">
            <el-scrollbar class="scroll-wrap" height="100%">
              <div class="grid grid-cols-5 gap-4">
                <div
                  v-for="(item, index) in dataStore.MaterialList"
                  :key="index"
                  @click="handleReplace(item)"
                  class="w-36 h-36 p-2 bg-slate-50 rounded-lg cursor-pointer"
                >
                  <el-image :src="item" alt="" fit="contain" lazy class="w-full h-full" />
                </div>
              </div>
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="上传图片">
            <div class="pt-10">
              <el-upload drag :before-upload="beforeUpload">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                  将图片拖到此处或
                  <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip"></div>
                </template>
              </el-upload>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CloseBold, UploadFilled } from '@element-plus/icons-vue'
import useDataStore from '@/stores/modules/data'
import useEditorStore from '@/stores/modules/editor'
import useAddImage from '@/hooks/useAddImage'

const dataStore = useDataStore()
const editorStore = useEditorStore()
const { replaceImage } = useAddImage()

const dialogVisible = ref(false)

const handleReplace = (imgSrc: string) => {
  replaceImage(imgSrc).then(() => {
    ElMessage.success('替换成功')
    dialogVisible.value = false
  })
}

const beforeUpload = (rawFile: any) => {
  const reader = new FileReader()
  reader.readAsDataURL(rawFile)
  reader.onload = e => {
    const base64Img = e.target?.result
    handleReplace(base64Img as string)
  }
  return false
}
</script>

<style scoped lang="scss">
// el-dialog
:deep(.el-dialog) {
  padding: 0;
  border-radius: 10px;
  background: #f5f5f7;
  .el-dialog__header {
    padding: 0;
    margin-right: 0;
  }
  .el-dialog__body {
    height: 550px;
  }
}

// el-tabs
:deep(.el-tabs--left .el-tabs__header.is-left) {
  padding: 20px 0;
  margin-right: 0;
}
:deep(.el-tabs__header) {
  margin-right: 0;
  padding-right: 0;
}
:deep(.el-tabs__content) {
  background: #fff;
  height: 100%;
  padding: 40px 24px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  .el-tab-pane {
    height: 100%;
  }
}
:deep(.el-tabs__item) {
  width: 200px;
  height: 45px;
  letter-spacing: 2px;
  color: #191b27 !important;
  border-right: 3px solid #fff;
}
:deep(.el-tabs--left .el-tabs__item.is-left) {
  text-align: center;
  justify-content: center;
  background: #fff;
}
:deep(.el-tabs__item.is-active) {
  color: #153aff !important;
  background: rgba(21, 58, 255, 0.1) !important;
  border-right: 3px solid #153aff;
}
:deep(.el-tabs__active-bar) {
  display: none;
}
:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-upload-dragger) {
  padding: 70px 10px;
}
</style>
