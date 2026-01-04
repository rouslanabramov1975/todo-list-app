const STORAGE_KEY = 'todos-v1'
const form = document.getElementById('todo-form')
const input = document.getElementById('todo-input')
const list = document.getElementById('todo-list')

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')

function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)) }

function render(){
  list.innerHTML = ''
  todos.forEach((t, i) => {
    const li = document.createElement('li')
    li.className = 'todo' + (t.done ? ' done' : '')
    const span = document.createElement('span')
    span.className = 'text'
    span.textContent = t.text
    span.addEventListener('click', () => {
      todos[i].done = !todos[i].done
      save(); render()
    })
    const btn = document.createElement('button')
    btn.className = 'remove'
    btn.textContent = '✕'
    btn.addEventListener('click', () => {
      todos.splice(i,1); save(); render()
    })
    li.appendChild(span)
    li.appendChild(btn)
    list.appendChild(li)
  })
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const v = input.value.trim()
  if(!v) return
  todos.push({text:v,done:false})
  input.value = ''
  save(); render()
})

render()
