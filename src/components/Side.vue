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
</script>

<template>
  <div>
    <el-input
      v-model="newListTitle" placeholder="新列表名" size="small" @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
      <template #prefix>
        <i display="inline-block" i-mdi-list-box-outline h-5 w-6 />
      </template>
    </el-input>
    <el-divider my-2 />
    <div v-for="item, index in todoTasks" :key="index" pt-1>
      <div>
        <button
          flex="~ row" h-6 w-full items-center b-1 btn dark:b="#4c4d4f" b="#dcdfe6"
          :class="{ active: currentTodoTaskIndex === index }"
          @click="handleChangeTask(index)"
        >
          <i display="inline-block" i-mdi-list-box-outline h-5 w-6 />
          <span>{{ item.title }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
