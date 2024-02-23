<script setup lang="ts">
import { dayjs } from 'element-plus'
import { todoTaskList } from '~/composables'

function handleAddTaskList() {
  todoTaskList.value.push({
    id: dayjs().valueOf(),
    title: 'default',
    type: 1,
    list: [],
  })
}
</script>

<template>
  <Header />
  <el-space alignment="flex-start" w-full overflow="auto">
    <task-list v-for="task in todoTaskList" :key="task.id" :list="task" />
    <el-button @click="handleAddTaskList">
      <template #icon>
        <svg-icon name="carbon:bookmark-add" />
      </template>
    </el-button>
  </el-space>
</template>
