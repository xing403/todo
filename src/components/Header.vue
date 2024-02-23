<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <el-header>
    <div class="header" flex="~ row" h-full items-center justify-between>
      <div class="header-left" flex="~ row" h-full items-center justify-between />
      <div class="header-right" flex="~ row" h-full items-center justify-between>
        <button i-carbon-haze dark:i-carbon-haze-night btn icon-btn @click="toggleDark()" />
      </div>
    </div>
  </el-header>
</template>
