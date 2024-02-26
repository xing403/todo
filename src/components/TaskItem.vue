<script setup lang="ts">
import { removeTaskItem } from '~/api/task'

const props = defineProps<{
  task: TaskType
}>()

const taskListId = inject<number>('listId', 0)
function handleListCommand(cmd: string) {
  switch (cmd) {
    case 'delete-task-item':
      removeTaskItem(taskListId, props.task.id)
      break
  }
}
</script>

<template>
  <div flex="~ row" justify="between">
    <div>
      <div>{{ task.title }}</div>
    </div>
    <el-dropdown @command="handleListCommand">
      <el-link>
        <template #icon>
          <svg-icon name="carbon:overflow-menu-horizontal" size="18" />
        </template>
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="delete-task-item">
            <span text-red-5 font-500>Delete Item</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
