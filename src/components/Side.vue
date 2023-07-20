<script setup lang="ts">
const newListTitle = ref('')
function handleInputConfirm() {
  if (newListTitle.value) {
    todoTasks.value.unshift({
      title: newListTitle.value,
      tasks: [],
    })
    handleChangeTask(0)
  }
  newListTitle.value = ''
}
function handleChangeTask(index: number) {
  currentTodoTaskIndex.value = index
  taskList.value = todoTasks.value[index]
}
function handleDeleteTasks(index: number) {
  todoTasks.value.splice(index, 1)
  if (currentTodoTaskIndex.value !== 0 && index === currentTodoTaskIndex.value)
    currentTodoTaskIndex.value -= 1
}
</script>

<template>
  <div>
    <el-input
      v-model="newListTitle" placeholder="新建分组" size="small" @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
      <template #prefix>
        <i display="inline-block" i-mdi-plus h-5 w-6 />
      </template>
    </el-input>
    <el-divider my-2 />
    <div v-for="item, index in todoTasks" :key="index" pt-1>
      <div
        flex="~ row" h-7 w-full items-center b-1 b-gray-4 b-rd-5px p-1 dark:b-gray-6 justify="between"
        :class="{ active: currentTodoTaskIndex === index }"
      >
        <button
          flex="1" text="left" pl-1
          @click="handleChangeTask(index)"
        >
          <span>{{ item.title }}</span>
        </button>
        <i i-mdi-delete-alert-outline h-5 w-6 text-red-400 @click="handleDeleteTasks(index)" />
      </div>
    </div>
  </div>
</template>
