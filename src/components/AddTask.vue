<script setup lang="ts">
import { addTaskItem } from '~/api/task'

const taskListId = inject<number>('listId', 0)
const taskTitle = ref('')
const InputRef = ref()
const inputVisible = ref(false)
function handleInputConfirm() {
  if (taskTitle.value) {
    addTaskItem(taskListId, {
      id: useCurrentTimestamp(),
      title: taskTitle.value,
    })
  }

  inputVisible.value = false
  taskTitle.value = ''
}
function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
</script>

<template>
  <div>
    <div class="flex gap-2">
      <el-input
        v-if="inputVisible" ref="InputRef" v-model="taskTitle" @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else w-full @click="showInput">
        新增 task 项
      </el-button>
    </div>
  </div>
</template>
