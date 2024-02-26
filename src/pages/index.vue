<script setup lang="ts">
import { todoTaskList } from '~/composables'
import { useCurrentTimestamp } from '~/composables/transform'

const additionDialog = ref(false)
const formRef = ref()
const form = ref<TaskListType>({
  id: useCurrentTimestamp(),
  title: '',
  color: '#409EFF',
  type: 0,
  list: [] as TaskType[],
})
const rules = {
  title: [{ required: true, message: '请输入任务列表名称', trigger: 'blur' }],
}
function handleAddTaskList() {
  formRef.value && formRef.value.validate((valid: boolean) => {
    if (valid) {
      todoTaskList.value.push({ ...form.value })
      resetForm()
      additionDialog.value = false
    }
  })
}
function openAdditionDialog() {
  additionDialog.value = true
}
function resetForm() {
  formRef.value && formRef.value.resetFields()
  form.value.id = useCurrentTimestamp()
}
</script>

<template>
  <Header />
  <el-space alignment="flex-start" w-full overflow="auto">
    <task-list v-for="task in todoTaskList" :key="task.id" :list="task" />
    <el-button @click="openAdditionDialog">
      <template #icon>
        <svg-icon name="carbon:bookmark-add" />
      </template>
    </el-button>
  </el-space>

  <el-dialog v-model="additionDialog" title="新增列表" width="350" color :before-close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="title">
        <el-input v-model="form.title" placeholder="列表名称" />
      </el-form-item>
      <el-form-item prop="color">
        <el-color-picker v-model="form.color" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="additionDialog = false">
          取消
        </el-button>
        <el-button type="primary" @click="handleAddTaskList">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
