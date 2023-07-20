<script setup lang="ts">
const inputValue = ref('')
const InputRef = ref()
function handleInputConfirm() {
  if (inputValue.value) {
    taskList.value.tasks.unshift({
      content: inputValue.value,
      check: false,
      time: '',
      type: 'default',
    })
  }
  inputVisible.value = false
  inputValue.value = ''
}

function handleDeleteTask(index: number) {
  taskList.value.tasks.splice(index, 1)
}
</script>

<template>
  <div class="main" h-full>
    <el-input
      v-if="inputVisible" ref="InputRef" v-model="inputValue"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <template v-if="inputVisible || taskList.tasks.length > 0">
      <div v-for="task, index in taskList.tasks" :key="index" ml-1 flex="~ row" items-center justify-between>
        <div flex="~ row" items-center justify-between>
          <el-checkbox v-model="task.check" />
          <div ml-2 :class="{ 'line-through': task.check }" v-html="task.content" />
        </div>
        <div>
          <button i-carbon-trash-can bg="#f56c6c" btn icon-btn @click="handleDeleteTask(index)" />
        </div>
      </div>
    </template>
    <template v-else>
      <el-empty description="暂无 todo 列表" />
    </template>
  </div>
</template>
