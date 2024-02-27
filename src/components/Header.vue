<script setup lang="ts">
import { h } from 'vue'
import SvgIcon from './SvgIcon.vue'
import { export2Html, export2Json, export2md } from '~/utils/export-file'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-header mb-1 border-b-1>
    <div class="header" flex="~ row" h-full items-center justify-between>
      <div class="header-left" flex="~ row" h-full items-center justify-between>
        <el-menu mode="horizontal" :ellipsis-icon="h(SvgIcon, { name: 'carbon:menu', size: '1.5em' })">
          <el-sub-menu index="export">
            <template #title>
              <span>导出</span>
            </template>
            <el-menu-item index="export-md" @click="export2md">
              <span>导出为 Markdown</span>
            </el-menu-item>
            <el-menu-item index="export-json" @click="export2Json">
              <span>导出为 JSON</span>
            </el-menu-item>
            <el-menu-item index="export-html" @click="export2Html">
              <span>导出为 HTML</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
      <div class="header-right" flex="~ row" h-full items-center justify-between>
        <button i-carbon-haze dark:i-carbon-haze-night btn icon-btn @click="toggleDark()" />
      </div>
    </div>
  </el-header>
</template>
