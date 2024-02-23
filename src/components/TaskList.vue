<script setup lang="ts">
import { removeTaskList } from '~/api/task'

const props = defineProps<{
  list: TaskListType
}>()
provide('listId', props.list.id)
const task = toRef(props.list)

function handleListCommand(cmd: string) {
  switch (cmd) {
    case 'delete-list':
      removeTaskList(task.value.id)
      break
  }
}
</script>

<template>
  <el-card flex="~ col" w-300px body-class="card-body  h-full">
    <template #header>
      <div flex="~ row " justify="between">
        <div class="card-header" text-2xl font-600>
          <span>{{ task.title }}</span>
        </div>
        <el-dropdown @command="handleListCommand">
          <el-button>
            <template #icon>
              <svg-icon name="carbon:overflow-menu-horizontal" />
            </template>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="delete-list">
                <span text-red-5 font-500>Delete List</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <div h-full>
      <task-item v-for="t in task.list" :key="t.id" :task="t" />
    </div>
    <template #footer>
      <add-task />
    </template>
  </el-card>
</template>
