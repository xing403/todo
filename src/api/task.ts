import { ElMessage } from 'element-plus'
import { todoTaskList } from '~/composables'
import { useCurrentTimestamp } from '~/composables/transform'

export function addTaskItem(listId: number, task: TaskType) {
  todoTaskList.value.find(item => item.id === listId)?.list.push(task)
}

export function editTaskItem(listId: number, taskId: number, task: TaskType) {
  const taskList = todoTaskList.value.find(item => item.id === listId)
  if (!taskList) {
    ElMessage.error('任务列表不存在')
    return
  }
  const taskItem = taskList.list.find(item => item.id === taskId)
  if (!taskItem) {
    ElMessage.error('任务项不存在')
    return
  }

  taskItem.title = task.title
}
export function removeTaskItem(listId: number, taskId: number) {
  const taskList = todoTaskList.value.find(item => item.id === listId)
  if (!taskList) {
    ElMessage.error('任务列表不存在')
    return
  }
  taskList.list.splice(taskList.list.findIndex(item => item.id === taskId), 1)
}

export function createTaskList(list: TaskListType, pre: boolean = false) {
  if (pre)
    todoTaskList.value.unshift(list)
  else
    todoTaskList.value.push(list)
}
export function removeTaskList(listId: number) {
  const taskList = todoTaskList.value.find(item => item.id === listId)
  if (!taskList) {
    ElMessage.error('任务列表不存在')
    return
  }
  if (taskList.type === 0 && taskList.list.length > 0) {
    ElMessage.error('未分配的列表中存在任务项')
    return
  }
  if (taskList.list.length > 0) {
    const systemList = todoTaskList.value.find(item => item.type === 0)
    if (systemList) {
      taskList.list.forEach((item) => {
        systemList.list.push(item)
      })
    }
    else {
      createTaskList({
        id: useCurrentTimestamp(),
        title: '系统',
        list: taskList.list,
        type: 0,
      }, true)
    }
  }

  todoTaskList.value.splice(todoTaskList.value.findIndex(item => item.id === listId), 1)
  if (todoTaskList.value.length === 0) {
    createTaskList({
      id: useCurrentTimestamp(),
      title: '系统',
      list: taskList.list,
      type: 0,
    }, true)
  }
}
