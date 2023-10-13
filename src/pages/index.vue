<script setup lang="ts">

</script>

<template>
  <div flex="~ row" class="common-layout" h-full min-w-md py-2>
    <div class="side hidden-xs-only" w-260px b-r-1 dark:b-r="#4c4d4f" b-r="#dcdfe6" px-2>
      <Side />
    </div>

    <div w-full>
      <Header />
      <el-divider my-1 />
      <TaskList />
    </div>
  </div>
</template>
