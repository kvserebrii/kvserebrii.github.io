const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
let id=todos.length;


saveLocalStorage();

class TODO{
  constructor(){
    this.id = id++;
    this.text = this.getText();
    this.check = false;
  }
  getText(){
    return prompt("Напишите свой todo: ");
  }
}

function newTodo() {
  const todo = new TODO();
  todos.push(todo);
  render();
}

function deleteTODO(id){
  todos = todos.filter(elem => elem.id !== id);
  render();
}

function render(){
  list.innerHTML = "";
  todos.map(renderTODO).forEach(todo => list.appendChild(todo));
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent =  todos.filter(elem => !elem.check).length;
  saveTODO();
}

function renderTODO(todo){
  const doLi = document.createElement("li");
  doLi.innerHTML = `
    <input type="checkbox" onchange="newCount(${todo.id})" ${todo.check == true ? "checked" : ""}>
    <button onclick="deleteTODO(${todo.id})">Удалить</button>
    <span>${todo.text}</span>`;
  id=todos.length;
  return doLi;
}

function newCount(id){
  todos = todos.map(todo => todo.id == id ? {...todo, check: !todo.check} : todo);
  uncheckedCountSpan.textContent =  todos.filter(elem => !elem.check).length;
  saveTODO();
}

function saveTODO(){
  localStorage.clear();
  localStorage.lastList = JSON.stringify(todos);
}

function saveLocalStorage(){
  if(localStorage.length > 0){
    todos = JSON.parse(localStorage.lastList);
    render();
  }
}