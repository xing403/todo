<script setup lang="ts">
const sideMenu = ref(false)
</script>

<template>
  <div class="header" flex="~ row" justify-between>
    <div class="header-left">
      <button i-carbon-list btn icon-btn class="hidden-sm-and-up" @click="sideMenu = true" />
    </div>
    <div class="header-right">
      <button i-carbon-haze dark:i-carbon-haze-night btn icon-btn @click="toggleDark()" />
    </div>
  </div>
  <el-drawer v-model="sideMenu" direction="ltr" title="任务列表" size="260px" :with-header="false">
    <Side />
  </el-drawer>
</template>
