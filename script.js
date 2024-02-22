import { newTodoElement, makeTodo } from "./modules.js";
let clickedElement = null;
let todos = [];
document.onload = setTodos(localStorage.getItem("todo-list"));

const mainContainer = document.querySelector(".main-container");
function setTodos(todo_list) {
  if (todo_list !== null) {
    todos = [...JSON.parse(todo_list)];
    const mainContainer = document.querySelector(".main-container");
    todos.forEach((todo) => {
      mainContainer.appendChild(makeTodo(todo, todos, clickedElement));
    });
  }
}

const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", (e) => {
  mainContainer.appendChild(newTodoElement(e, clickedElement, todos));
  localStorage.setItem("todo-list", JSON.stringify(todos));
});

const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  if (e.target.className === "todo-container") {
    if (clickedElement === null) {
      clickedElement = e.target;
      clickedElement.style.border = "3px solid dodgerblue";
    } else {
      clickedElement.style.border = "3px solid transparent";
      clickedElement = e.target;
      clickedElement.style.border = "3px solid dodgerblue";
    }
  } else if (e.target.parentElement.className === "todo-container") {
    if (clickedElement === null) {
      clickedElement = e.target.parentElement;
      clickedElement.style.border = "3px solid dodgerblue";
    } else {
      clickedElement.style.border = "3px solid transparent";
      clickedElement = e.target.parentElement;
      clickedElement.style.border = "3px solid dodgerblue";
    }
  } else {
    const todoContainers = document.querySelectorAll(".todo-container");
    todoContainers.forEach((todoContainer) => {
      todoContainer.style.border = "3px solid transparent";
    });
  }
});
