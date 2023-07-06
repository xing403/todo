<script setup lang="ts">
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const sideMenu = ref(false)
function handleShowInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

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
  <div flex="~ row" class="common-layout" h-full min-w-md py-2>
    <div class="side hidden-xs-only" w-200px b-r-1 dark:b-r="#4c4d4f" b-r="#dcdfe6" px-2>
      <Side />
    </div>
    <el-drawer v-model="sideMenu" direction="ltr" title="任务列表" size="200px" :with-header="false">
      <Side />
    </el-drawer>

    <div w-full>
      <div class="header" flex="~ row" justify-between>
        <div>
          <button i-carbon-list btn icon-btn class="hidden-sm-and-up" @click="sideMenu = true" />
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
    </div>
  </div>
</template>
