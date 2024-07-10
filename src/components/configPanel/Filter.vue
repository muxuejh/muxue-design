<template>
  <div v-if="editorStore.selectType === 'image'">
    <!-- <h2 class="title">图片滤镜</h2> -->
    <el-collapse style="margin-bottom: 25px">
      <el-collapse-item>
        <template #title>
          <h2 class="title" style="margin-bottom: 0">图片滤镜</h2>
        </template>
        <div class="filter-wrap">
          <div
            class="filter-item"
            :class="{ active: activeValue === index }"
            v-for="(item, index) in filterList"
            :key="item.value"
            @click="setFilter(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import useFilter from '@/hooks/useFilter'

const editorStore = useEditorStore()

const activeValue = ref(0)
const filterList = [
  { name: '原图', value: '' },
  { name: '灰度', value: 'Grayscale' },
  { name: '底片', value: 'Invert' },
  { name: '黑白', value: 'BlackWhite' },
  { name: '怀旧', value: 'Sepia' },
  { name: '模糊', value: 'Blur', options: { blur: 0.5 } },
  { name: '老照片', value: 'Vintage' }
]

const setFilter = (
  { value, options }: { name: string; value: string; options?: any },
  index: number
) => {
  if (activeValue.value === index) return
  activeValue.value = index
  useFilter(value, options)
}
</script>

<style scoped lang="scss">
.filter-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .filter-item {
    width: 90px;
    height: 90px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #e6e6e6;
    }
    &.active {
      background-color: #e6e6e6;
    }
  }
}
</style>
