<template>
  <div class="sidebar-container">
    <div class="menu">
      <div class="bar" :style="barStyle"></div>
      <div
        class="menu-item"
        :class="{ active: index === activeIndex }"
        v-for="(menu, index) in menus"
        :key="index"
        @click="changeMenu(index)"
      >
        <SvgIcon
          class="icon"
          :name="menu.icon"
          :color="index === activeIndex ? '#409EFF' : '#000000'"
        />
        <span class="text">{{ menu.name }}</span>
      </div>
    </div>

    <div class="menu-content" :class="appStore.isMenuContentCollapse ? 'hidden' : ''">
      <component v-show="!appStore.isMenuContentCollapse" :is="copms[activeIndex]" />
    </div>

    <MenuSwitch target="sidebar" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useAppStore from '@/stores/modules/app'
import MenuSwitch from '@/components/MenuSwitch.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import Template from './components/Template.vue'
import Material from './components/Material.vue'
import Element from './components/Element.vue'
import Layer from './components/Layer.vue'

const appStore = useAppStore()

const copms = [Template, Material, Element, Layer]

const activeIndex = ref(0)
const menus = ref([
  { name: '模板', icon: 'template' },
  { name: '素材', icon: 'material' },
  { name: '元素', icon: 'element' },
  { name: '图层', icon: 'layer' }
])
const barStyle = ref({ transform: 'translateY(0)' })
const changeMenu = (index: number) => {
  barStyle.value.transform = `translateY(${index * 66}px)`
  activeIndex.value = index
}
</script>

<style scoped lang="scss">
.sidebar-container {
  position: relative;
  display: flex;
  height: 100%;
  .menu {
    position: relative;
    width: $sidebar-menu-width;
    height: 100%;
    background: $main-bg-color;
    border-right: 1px solid $border-color;
    .bar {
      position: absolute;
      right: 0;
      width: 2px;
      height: 66px;
      background: var(--el-color-primary);
      transition: all 0.3s;
    }
    .menu-item {
      height: 66px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.active {
        color: var(--el-color-primary);
      }
      &:hover {
        background: #f1f1f1;
      }
      .icon {
        margin-bottom: 5px;
      }
    }
  }

  .menu-content {
    width: $sidebar-menu-content-width;
    padding: 15px;
    background: $main-bg-color;
    border-right: 1px solid $border-color;
    transition: all 0.3s;
  }
}
</style>
