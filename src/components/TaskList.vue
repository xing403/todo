<script setup lang="ts">
import { ElMessage, dayjs } from 'element-plus'
import { useSortable } from '@vueuse/integrations/useSortable'

const TaskRef = ref<HTMLInputElement | null>(null)
const todoTaskRef = ref<HTMLInputElement | null>(null)
const taskContent = ref('')
const taskType = ref<TaskType>('default')
const todoTask = ref<Tasks>(todoTaskList.value.find(item => item.sidebarId === currentTodoId.value) ?? {
  sidebarId: currentTodoId.value,
  tasks: [],
  total: 0,
  done: 0,
})
function handleTaskConfirm() {
  if (taskContent.value.trim() === '') {
    ElMessage.warning('内容不能为空')
    return
  }
  const id = useTimestamp().value
  todoTask.value.tasks.unshift({
    id,
    content: taskContent.value,
    type: taskType.value,
    time: useTimestamp().value,
    check: false,
  })
  taskType.value = 'default'
  taskContent.value = ''
  ElMessage.success('成功！')

  todoTaskList.value.forEach((element) => {
    if (element.sidebarId === currentTodoId.value) {
      element.tasks = todoTask.value.tasks
      element.total += 1
    }
  })

  TODO_TASK_LIST_STORAGE.value = todoTaskList.value
}

function handleDeleteTask(task_id: number) {
  todoTask.value.tasks = todoTask.value.tasks.filter(({ id }) => id !== task_id)
}
function handleTodoCheck(val: boolean) {
  todoTask.value.done += val ? 1 : -1
  todoTaskList.value.forEach((element) => {
    if (element.sidebarId === currentTodoId.value)
      element.tasks = todoTask.value.tasks
  })
  TODO_TASK_LIST_STORAGE.value = todoTaskList.value
}
watch(currentTodoId, () => {
  todoTask.value = todoTaskList.value.find(item => item.sidebarId === currentTodoId.value) ?? {
    sidebarId: currentTodoId.value,
    tasks: [],
    total: 0,
    done: 0,
  }
})
useSortable(todoTaskRef, todoTask.value.tasks, {
  animation: 150,
})
</script>

<template>
  <div class="main" m-10px h-full>
    <el-input ref="TaskRef" v-model="taskContent">
      <template #prepend>
        <el-select v-model="taskType" clearable>
          <el-option label="不重要不紧急" value="default" />
          <el-option label="重要" value="important" />
          <el-option label="紧急" value="urgent" />
          <el-option label="重要且紧急" value="important-urgent" />
        </el-select>
      </template>
      <template #append>
        <el-button type="primary" size="default" @click="handleTaskConfirm">
          保存
        </el-button>
      </template>
    </el-input>
    <div v-if="todoTask.tasks.length > 0" ref="todoTaskRef" class="task-list">
      <template v-for="task in todoTask.tasks" :key="task.id">
        <div flex="~ row" ml-1 mt-5 h-1.5em h-1em items-center justify-between text-2xl>
          <div flex="~ row" items-center justify-between>
            <div class="task-type" :class="`${task.type}`" />
            <el-checkbox v-model="task.check" @change="handleTodoCheck" />
            <div ml-2 px-10px :class="{ 'line-through': task.check }" v-html="task.content" />
          </div>
          <div flex="~ row" items-center justify-between>
            <span class="create-time" mr-2>{{ dayjs(task.time).format("YYYY-MM-DD") }}</span>
            <button i-carbon-trash-can bg="#f56c6c" btn icon-btn @click="handleDeleteTask(task.id)" />
          </div>
        </div>
        <el-divider my-2 />
      </template>
    </div>
    <template v-else>
      <el-empty description="暂无 todo 列表" />
    </template>
  </div>
</template>

<style>
.task-type{
  width: 5px;
  height: 1em;
  margin-right: 5px;
}
.task-type,.default{
  background-color: #409eff;
}
.important{
  background-color: #e6a23c;
}
.urgent{
  background-color: #f56c6c;
}
.important-urgent{
  background-color: #AA0000;
}
</style>
