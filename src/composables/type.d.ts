export interface TaskType {
  content: string
  check: boolean
  time: string
  type: 'normal' | 'urgency' | 'default'
}
export interface TasksType {
  tasks: TaskType[],
  title: string
}
