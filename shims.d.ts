declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface TaskType {
  content: string
  check: boolean
  time: string
  type: 'normal' | 'urgency' | 'default'
}
interface TasksType {
  tasks: TaskType[],
  title: string
}
