<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { useSortable } from '@vueuse/integrations/useSortable'

const sidebarTitle = ref('')
const sidebarRef = ref()
function handleCreateSidebarConfirm() {
  if (sidebarTitle.value === '') {
    ElMessage.error('分组名称不能为空')
    return
  }
  const id = useTimestamp().value
  todoTasksSidebar.value.unshift({
    id,
    title: sidebarTitle.value,
  })
  sidebarTitle.value = ''
  ElMessage.success('新建分组成功')
  todoTaskList.value.push({
    sidebarId: id,
    tasks: [],
    total: 0,
    done: 0,
  })
  TODO_TASKS_SIDEBAR_STORAGE.value = todoTasksSidebar.value
  TODO_TASK_LIST_STORAGE.value = todoTaskList.value
  currentTodoId.value = id
}
function handleDeleteTasks(sidebarId: number) {
  todoTasksSidebar.value = todoTasksSidebar.value.filter(({ id }) => id !== sidebarId)
  TODO_TASKS_SIDEBAR_STORAGE.value = todoTasksSidebar.value
}
function handleChangeTask(sidebarId: number) {
  currentTodoId.value = sidebarId
}

useSortable(sidebarRef, todoTasksSidebar, {
  animation: 150,
})
</script>

<template>
  <div>
    <el-input
      v-model="sidebarTitle" clearable placeholder="新建分组" size="small" @keyup.enter="handleCreateSidebarConfirm"
    >
      <template v-if="sidebarTitle === ''" #prefix>
        <i display="inline-block" i-mdi-plus h-5 w-6 />
      </template>
      <template #append>
        <el-button @click="handleCreateSidebarConfirm">
          保存
        </el-button>
      </template>
    </el-input>
    <el-divider my-2 />
    <div ref="sidebarRef" h-full>
      <div v-for="item in todoTasksSidebar" :key="item.id" pt-1>
        <div
          flex="~ row" h-7 w-full items-center b-1 b-gray-4 b-rd-5px p-1 dark:b-gray-6 justify="between"
          :class="{ active: currentTodoId === item.id }"
        >
          <button
            flex="1" text="left" pl-1
            @click="handleChangeTask(item.id)"
          >
            <span>{{ item.title }}</span>
          </button>
          <i i-mdi-delete-alert-outline h-5 w-6 text-red-400 @click="handleDeleteTasks(item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
