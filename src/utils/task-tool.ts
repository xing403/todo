export function sortTaskItem(list: TaskType[], orderBy: 'asc' | 'desc' = 'asc') {
  return list.sort(orderBy === 'asc' ? compareTaskItem : (a, b) => compareTaskItem(b, a))
}

function compareTaskItem(a: TaskType, b: TaskType) {
  return a.status === true ? 1 : b.status === true ? -1 : 0
}
