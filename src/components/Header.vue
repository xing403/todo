<script setup lang="ts">
const sideMenu = ref(false)

function handleShowInput() {
  inputVisible.value = true
}
</script>

<template>
  <div class="header" flex="~ row" justify-between>
    <div>
      <button i-carbon-list btn icon-btn class="hidden-sm-and-up" @click="sideMenu = true" />
      <el-drawer v-model="sideMenu" direction="ltr" title="任务列表" size="200px" :with-header="false">
        <Side />
      </el-drawer>
    </div>
    <div>
      <button i-carbon-add-alt btn icon-btn @click="handleShowInput" />
      <button i-carbon-haze dark:i-carbon-haze-night btn icon-btn @click="toggleDark()" />
    </div>
  </div>
</template>
