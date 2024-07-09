<template>
  <div
    class="config-item"
    v-if="editorStore.selectMode === 'one' && showType.includes(editorStore.selectType)"
  >
    <h2 class="title">文字</h2>
    <div class="box">
      <el-select
        style="width: 136px"
        v-model="objectAttrs.fontFamily"
        placeholder="字体"
        @change="value => setFabricObjectAttr('fontFamily', value)"
      >
        <el-option label="arial" value="arial" />
        <el-option label="宋体" value="SimSun" />
        <el-option label="黑体" value="SimHei" />
        <el-option label="monospace" value="monospace" />
      </el-select>
      <el-input
        style="width: 136px"
        v-model.number="objectAttrs.fontSize"
        placeholder="字号"
        @change="value => setFabricObjectAttr('fontSize', value)"
      />
    </div>
    <div class="attr-item">
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.textAlign === 'left' }"
        name="alignLeft"
        @click="setFabricObjectAttr('textAlign', 'left')"
      />
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.textAlign === 'center' }"
        name="alignCenter"
        @click="setFabricObjectAttr('textAlign', 'center')"
      />
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.textAlign === 'right' }"
        name="alignRight"
        @click="setFabricObjectAttr('textAlign', 'right')"
      />
    </div>
    <div class="attr-item text-attr">
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.fontWeight === 'bold' }"
        name="bold"
        @click="setFabricObjectAttr('fontWeight', objectAttrs.fontWeight)"
      />
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.fontStyle === 'italic' }"
        name="italic"
        @click="setFabricObjectAttr('fontStyle', objectAttrs.fontStyle)"
      />
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.linethrough }"
        name="linethrough"
        @click="setFabricObjectAttr('linethrough', objectAttrs.linethrough)"
      />
      <SvgIcon
        class="icon"
        :class="{ active: objectAttrs.underline }"
        name="underline"
        @click="setFabricObjectAttr('underline', objectAttrs.underline)"
      />
    </div>
    <div class="ipt-box">
      <el-input
        v-model.number="objectAttrs.lineHeight"
        @change="value => setFabricObjectAttr('lineHeight', value)"
      >
        <template #prefix>行高</template>
      </el-input>
      <el-input
        v-model.number="objectAttrs.charSpacing"
        @change="value => setFabricObjectAttr('charSpacing', value)"
      >
        <template #prefix>间距</template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useEditorStore from '@/stores/modules/editor'
import useFabricObjectAttr from '@/hooks/useFabricObjectAttr'
import { fabricObject } from '@/types/fabric'
import SvgIcon from '@/components/SvgIcon.vue'

const editorStore = useEditorStore()

const showType = ['i-text', 'textbox', 'text']

const objectAttrs = reactive({
  fontFamily: '',
  fontSize: 0,
  textAlign: '',
  fontWeight: '',
  fontStyle: '',
  linethrough: false,
  underline: false,
  lineHeight: 0,
  charSpacing: 0
})

const getObjectAttr = (activeObject: fabricObject | undefined) => {
  if (activeObject && showType.includes(activeObject.type!)) {
    objectAttrs.fontFamily = activeObject.get('fontFamily') || ''
    objectAttrs.fontSize = activeObject.get('fontSize') || 0
    objectAttrs.textAlign = activeObject.get('textAlign') || ''
    objectAttrs.fontWeight = (activeObject.get('fontWeight') as string) || ''
    objectAttrs.fontStyle = activeObject.get('fontStyle') || ''
    objectAttrs.linethrough = activeObject.get('linethrough') || false
    objectAttrs.underline = activeObject.get('underline') || false
    objectAttrs.lineHeight = activeObject.get('lineHeight') || 0
    objectAttrs.charSpacing = activeObject.get('charSpacing') || 0
  }
}

const handleChange = (activeObject: fabricObject | undefined, key: any, value: any) => {
  if (activeObject) {
    if (key === 'fontWeight') {
      value = value === 'bold' ? 'normal' : 'bold'
    }
    if (key === 'fontStyle') {
      value = value === 'italic' ? 'normal' : 'italic'
    }
    if (key === 'linethrough' || key === 'underline') {
      value = !value
    }
    activeObject.set(key, value)
  }
  getObjectAttr(activeObject)
}

const { setFabricObjectAttr } = useFabricObjectAttr(getObjectAttr, handleChange)
</script>

<style scoped lang="scss">
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.text-attr {
  margin-top: 10px;
  > .icon {
    width: 65px;
  }
}

.ipt-box {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :deep(.el-input) {
    width: 140px;
  }
  :deep(.el-input__wrapper) {
    height: 35px;
  }
  :deep(.el-input__inner) {
    text-align: center;
  }
}
</style>
