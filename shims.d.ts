declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**
 * task 类型
 */
type TaskType = 'important-urgent' | 'urgent' | 'important' | 'default'
interface TodoTasksSidebarType {
  /**
   * 侧边栏编号
   */
  id: number,
  /**
   * 侧边栏标题
   */
  title: string,
}
interface Task {
  /**
   * task 编号
   */
  id: number
  /**
   * task 内容
   */
  content: string
  /**
   * 是否标记完成
   * @default false
   */
  check: boolean
  /**
   * 创建时间
   */
  time: string | number
  /**
   * 任务类型
   */
  type: TaskType
}
interface Tasks {
  /**
   * 所属分类编号
   */
  sidebarId: number
  /**
   * task 列表
   */
  tasks: Task[],
  /**
   * 总计 task 数量
   */
  total: number,
  /**
   * 已完成 task 数量
   */
  done: number,
}
