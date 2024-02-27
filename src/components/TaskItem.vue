<script setup lang="ts">
import { editTaskItemStatus, removeTaskItem } from '~/api/task'

const props = defineProps<{
  task: TaskType
}>()

const emits = defineEmits(['editTask'])
const taskListId = inject<number>('listId', 0)

function handleListCommand(cmd: string) {
  switch (cmd) {
    case 'delete-task-item':
      removeTaskItem(taskListId, props.task.id)
      break
    case 'edit-task-item':
      emits('editTask', props.task.id)
      break
    case 'finish-task-item':
      editTaskItemStatus(taskListId, props.task.id, true)
      break
    case 'undo-task-item':
      editTaskItemStatus(taskListId, props.task.id, false)
      break
  }
}
</script>

<template>
  <div
    flex="~ row" justify="between" my-1 border-rd-3 px-2 py-1 cursor="pointer"
    hover="dark:bg-dark-200 light:bg-light-600"
  >
    <div flex="~ row gap-1" items-center text-1.2em>
      <svg-icon :name="task.status ? 'carbon:checkbox-checked' : 'carbon:checkbox'" />
      <div>{{ task.title }}</div>
    </div>
    <el-dropdown @command="handleListCommand">
      <el-link :underline="false">
        <template #icon>
          <svg-icon name="carbon:overflow-menu-horizontal" size="24px" />
        </template>
      </el-link>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="task.status" command="undo-task-item">
            <span text-gray-5 font-500>Undo</span>
          </el-dropdown-item>
          <el-dropdown-item v-else command="finish-task-item">
            <span text-green-5 font-500>Finish</span>
          </el-dropdown-item>
          <el-dropdown-item command="edit-task-item">
            <span text-orange-5 font-500>Edit</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="delete-task-item">
            <span text-red-5 font-500>Delete</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
