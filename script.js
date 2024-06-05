// FORM
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const todoWrap = document.querySelector('#todo-wrap');
const greeting = document.querySelector('#greeting');

const HIDDEN_CALSS = 'hidden';
const USERNAME_KEY = 'username';

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CALSS);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  greeting.innerText = `${username} TODO`;
  todoWrap.classList.remove(HIDDEN_CALSS);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CALSS);
  loginForm.addEventListener('submit', onLoginSubmit);
} else {
  todoWrap.classList.remove(HIDDEN_CALSS);
  greeting.innerText = `${savedUserName} TODO`;
}

// TODO

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-form input');
const todoList = document.querySelector('#todo-list');

let toDos = [];

function saveTodos() {
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodos();
}

function addTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  const button = document.createElement('button');
  button.innerText = '✖︎';
  button.addEventListener('click', deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

function onTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  addTodo(newTodoObj);
  saveTodos();
}

todoForm.addEventListener('submit', onTodoSubmit);

const savedTodos = localStorage.getItem('toDos');

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(addTodo);
}
