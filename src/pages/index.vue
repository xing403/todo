<script setup lang="ts">
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
function handleShowInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
interface TaskType {
  content: string
  check: boolean
  time: string
}
const taskList = ref<TaskType[]>([])
function handleInputConfirm() {
  if (inputValue.value) {
    taskList.value.unshift({
      content: inputValue.value,
      check: false,
      time: '',
    })
  }
  inputVisible.value = false
  inputValue.value = ''
  saveTasks()
}

function handleChangeTaskCheck(index: number) {
  saveTasks()
}
function handleDeleteTask(index: number) {
  taskList.value.splice(index, 1)
}
function saveTasks() {

}
</script>

<template>
  <div flex="~ row" class="common-layout" h-full min-w-md py-2>
    <div class="side hidden-sm-and-down" br- w-200px b-r-1 dark:b-r="#4c4d4f" b-r="#dcdfe6" />
    <div w-full>
      <div class="header" flex="~ row" justify-between>
        <div>
          <button i-carbon-list btn icon-btn class="hidden-md-and-up" />
        </div>
        <div>
          <button i-carbon-add-alt btn icon-btn @click="handleShowInput" />
          <button i-carbon-haze dark:i-carbon-haze-night btn icon-btn @click="toggleDark()" />
        </div>
      </div>
      <el-divider my-1 />
      <div class="main" h-full>
        <el-input
          v-if="inputVisible" ref="InputRef" v-model="inputValue" @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <template v-if="inputVisible || taskList.length > 0">
          <div v-for="task, index in taskList" :key="index" ml-1 flex="~ row" items-center justify-between>
            <div flex="~ row" items-center justify-between>
              <el-checkbox v-model="task.check" @change="handleChangeTaskCheck(index)" />
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
    </div>
  </div>
</template>
