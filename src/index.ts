import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.getElementById('new-task-form') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#new-task-title')
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener('submit', e => {
  e.preventDefault()
  if (input?.value === '' || input?.value === null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input === null ? '' : input.value,
    completed: true,
    createAt: new Date()
  }
  tasks.push(newTask)

  addListItem(newTask);
  input === null ? '' : input.value = ''
})

function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const checkbox = document.createElement('input')
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = 'checkbox'
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('TASKS')
  return taskJson == null ? [] : JSON.parse(taskJson)
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}