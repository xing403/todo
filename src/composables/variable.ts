// 所有的todo 任务
export const todoTasks = useLocalStorage<TasksType[]>('list', [], {
  mergeDefaults: true,
})
// 多任务列表中当前选择的任务索引
export const currentTodoTaskIndex = ref(0)
// 当前展示的任务列表
export const taskList = computed({
  get() {
    const first = useLocalStorage('first', true)
    if (first.value) {
      first.value = false
      if (!todoTasks.value[currentTodoTaskIndex.value]) {
        todoTasks.value[0] = {
          tasks: [{
            content: '欢迎使用todo List',
            check: false,
            time: '',
            type: 'default',
          }],
          title: '欢迎',
        }
      }
    }
    return todoTasks.value[currentTodoTaskIndex.value] ?? {
      tasks: [],
      title: '',
    }
  },
  set(v) {
    todoTasks.value[currentTodoTaskIndex.value] = v
  },
})

export const inputVisible = ref(false)
