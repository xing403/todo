<script setup lang="ts">
import { editTaskItem, removeTaskItem } from '~/api/task'

const props = defineProps<{
  task: TaskType
}>()

const taskListId = inject<number>('listId', 0)
const formRef = ref()
const form = ref<TaskType>({ ...props.task })
const editDialog = ref(false)
const rules = {

}

function handleListCommand(cmd: string) {
  switch (cmd) {
    case 'delete-task-item':
      removeTaskItem(taskListId, props.task.id)
      break
    case 'edit-task-item':
      editDialog.value = true
      break
  }
}

function handleEditTaskList() {
  formRef.value && formRef.value.validate((valid: boolean) => {
    if (valid) {
      editTaskItem(taskListId, props.task.id, { ...form.value })
      resetForm()
    }
  })
}
function resetForm(done?: () => void) {
  formRef.value && formRef.value.resetFields()
  editDialog.value = false
  done?.()
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
          <el-dropdown-item command="edit-task-item">
            <span text-orange-5 font-500>Edit List</span>
          </el-dropdown-item>
          <el-dropdown-item divided command="delete-task-item">
            <span text-red-5 font-500>Delete Item</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog v-model="editDialog" title="编辑任务" width="300px" center :before-close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="resetForm()">取消</el-button>
        <el-button type="primary" @click="handleEditTaskList">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
