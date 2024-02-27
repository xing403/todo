import markdownit from 'markdown-it'
import FileSaver from 'file-saver'
import { todoTaskList } from '~/composables'

const md = markdownit()

export function saveFile(text: string, type: string, name: string) {
  const blob = new Blob([text], { type })
  FileSaver.saveAs(blob, name)
}

// 将文本导出为markdown格式文件
function export2mdText(save: boolean = true) {
  const MD_COMPONENTS = {
    h2: (content: TaskListType) => `## ${content.title}`,
    body: (content: TaskType) => `* [${content.status ? 'x' : ' '}] ${content.title}`,
  }
  const mdString: string[] = []
  todoTaskList.value.forEach((list) => {
    mdString.push(MD_COMPONENTS.h2(list))
    list.list.forEach((item) => {
      mdString.push(MD_COMPONENTS.body(item))
    })
  })
  const s = mdString.join('\n\n')
  save && saveFile(s, 'text/markdown;charset=utf-8', 'todo.md')
  return md.render(s)
}
export function export2md() {
  export2mdText()
}
export function export2Html() {
  const mdHTML = export2mdText(false)
  saveFile(mdHTML, 'text/html;charset=utf-8', 'todo.html')
}
export function export2Json() {
  saveFile(JSON.stringify(todoTaskList.value.map((list: TaskListType) => {
    return {
      title: list.title,
      list: list.list.map((item: TaskType) => ({
        title: item.title,
        status: item.status,
      })),
    }
  }), null, '\t'), 'application/json;charset=utf-8', 'todo.json')
}
