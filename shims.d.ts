declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface BaseType {
  // 编号
  id: number
  // 标题
  title: string

  [key: string]: any
}

interface TaskType extends BaseType {
  status: boolean
}

interface TaskListType extends BaseType {
  // 列表类型 0 自动创建， 1 手动创建
  type: number,
  color?: string,
  // 任务列表
  list: TaskType[]
}
