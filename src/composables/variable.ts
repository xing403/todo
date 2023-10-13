// 侧边栏
export const TODO_TASKS_SIDEBAR_STORAGE = useLocalStorage<TodoTasksSidebarType[]>('sidebar', [])
export const todoTasksSidebar = ref(TODO_TASKS_SIDEBAR_STORAGE.value)
export const TODO_TASK_LIST_STORAGE = useLocalStorage<Tasks[]>('todoTaskList', [])

export const todoTaskList = ref(TODO_TASK_LIST_STORAGE.value)

export const currentTodoId = ref(TODO_TASKS_SIDEBAR_STORAGE.value[0]?.id)
