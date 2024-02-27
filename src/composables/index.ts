export const TODO_TASK_LIST_STORAGE = useLocalStorage<TaskListType[]>('todo-data-list', [{
  id: useCurrentTimestamp(),
  title: 'Default',
  type: 0,
  list: [],
}])

export const todoTaskList = ref(TODO_TASK_LIST_STORAGE.value)
