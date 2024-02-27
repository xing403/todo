<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import { editTaskItem, removeTaskList } from '~/api/task'
import { sortTaskItem } from '~/utils/task-tool'

const props = defineProps<{
  list: TaskListType
}>()
const editDialog = ref(false)
const editTaskDialog = ref(false)
const taskForm = ref<TaskType>({
  id: 0,
  title: '',
  status: false,
  color: '',
  type: 'normal',
  list: [],
})
const formRef = ref()
const taskFormRef = ref()
const form = ref<TaskListType>({
  id: props.list.id,
  title: props.list.title,
  color: props.list.color,
  type: props.list.type,
  list: props.list.list,
})
const rules = {
  title: [{ required: true, message: '请输入任务列表名称', trigger: 'blur' }],
}
provide('listId', props.list.id)
const task = toRef(props.list)

function handleListCommand(cmd: string) {
  switch (cmd) {
    case 'delete-list':
      handleRemoveTaskList()
      break
    case 'edit-list':
      editDialog.value = true
      break
  }
}
function handleRemoveTaskList() {
  ElMessageBox.confirm(
    '确定删除这个列表吗',
    '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
    removeTaskList(task.value.id)
  }).catch(() => { })
}

function handleEditTaskList() {
  formRef.value && formRef.value.validate((valid: boolean) => {
    if (valid) {
      const current = todoTaskList.value.find((item: TaskListType) => item.id === form.value.id)
      if (current) {
        current.title = form.value.title
        current.color = form.value.color
      }
      editDialog.value = false
    }
  })
}
function resetForm(done?: () => void) {
  formRef.value && formRef.value.resetFields()
  editDialog.value = false
  if (done)
    done()
}

function handleGetCurrentEditTask(id: number) {
  const current = task.value.list.find((item: TaskType) => item.id === id)
  if (current) {
    taskForm.value = { ...current }
    editTaskDialog.value = true
  }
}

function handleEditTaskItem() {
  taskFormRef.value && taskFormRef.value.validate((valid: boolean) => {
    if (valid) {
      editTaskItem(task.value.id, taskForm.value.id, { ...taskForm.value })
      editTaskDialog.value = false
    }
  })
}
</script>

<template>
  <el-card flex="~ col" w-300px body-class="card-body  h-full">
    <template #header>
      <div flex="~ row " justify="between">
        <el-badge :hidden="task.list.length === 0" :value="task.list.length" type="info">
          <div flex="~ row gap-2" items-center px-2 text-2xl font-600>
            <svg-icon name="carbon:circle-filled" :color="task.color" />
            <span>{{ task.title }}</span>
          </div>
        </el-badge>
        <el-dropdown @command="handleListCommand">
          <el-button>
            <template #icon>
              <svg-icon name="carbon:overflow-menu-horizontal" />
            </template>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="edit-list">
                <span text-orange-5 font-500>Edit List</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="delete-list">
                <span text-red-5 font-500>Delete List</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
    <TransitionGroup tag="div" name="fade" class="h-full">
      <task-item v-for=" t in sortTaskItem(task.list) " :key="t.id" :task="t" @edit-task="handleGetCurrentEditTask" />
    </TransitionGroup>
    <template #footer>
      <add-task />
    </template>
  </el-card>

  <el-dialog v-model="editTaskDialog" title="编辑任务" width="300px" center>
    <el-form ref="taskFormRef" :model="taskForm" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="taskForm.title" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="editTaskDialog = false">取消</el-button>
        <el-button type="primary" @click="handleEditTaskItem">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editDialog" title="编辑列表" width="350" color :before-close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="form.title" placeholder="列表名称" />
      </el-form-item>
      <el-form-item prop="color">
        <el-color-picker v-model="form.color" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer" items-center gap-1>
        <el-button @click="resetForm()">
          取消
        </el-button>
        <el-button type="primary" @click="handleEditTaskList">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
