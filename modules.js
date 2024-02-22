export function newTodoElement(e, clickedElement, todos) {
  e.preventDefault();
  const newTodoIndex = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
  const newTodo = { id: newTodoIndex, checked: false, content: "" };

  const newTodoContainer = document.createElement("div");
  newTodoContainer.className = "todo-container";

  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.className = "todo-checkbox";
  newCheckbox.addEventListener("click", (e) => onClickCheckBox(e, todos));

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.className = "todo-content";
  newInput.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
  newInput.addEventListener("change", (e) => {
    onChangeInput(e, todos);
  });

  const newEditBtn = document.createElement("button");
  newEditBtn.className = "todo-editBtn";
  newEditBtn.innerText = "✐";
  newEditBtn.addEventListener("click", (e) => {
    onClickEditBtn(e);
  });

  const newRemoveBtn = document.createElement("button");
  newRemoveBtn.className = "todo-removeBtn";
  newRemoveBtn.innerText = "-";
  newRemoveBtn.addEventListener("click", (e) => {
    onClickRemoveBtn(e, todos);
  });
  newTodoContainer.appendChild(newCheckbox);
  newTodoContainer.appendChild(newInput);
  newTodoContainer.appendChild(newEditBtn);
  newTodoContainer.appendChild(newRemoveBtn);

  newTodoContainer.id = newTodo.id;
  todos.push(newTodo);
  return newTodoContainer;
}

export function makeTodo(todo, todos, clickedElement) {
  const newTodoContainer = document.createElement("div");
  newTodoContainer.className = "todo-container";

  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.className = "todo-checkbox";
  newCheckbox.addEventListener("click", (e) => onClickCheckBox(e, todos));

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.className = "todo-content";
  newInput.value = todo.content;
  newInput.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });
  newInput.addEventListener("change", (e) => {
    onChangeInput(e, todos);
  });
  const newEditBtn = document.createElement("button");
  newEditBtn.className = "todo-editBtn";
  newEditBtn.innerText = "✐";
  newEditBtn.addEventListener("click", (e) => {
    onClickEditBtn(e);
  });

  const newRemoveBtn = document.createElement("button");
  newRemoveBtn.className = "todo-removeBtn";
  newRemoveBtn.innerText = "-";
  newRemoveBtn.addEventListener("click", (e) => {
    onClickRemoveBtn(e, todos);
  });
  newTodoContainer.appendChild(newCheckbox);
  newTodoContainer.appendChild(newInput);
  newTodoContainer.appendChild(newEditBtn);
  newTodoContainer.appendChild(newRemoveBtn);

  newTodoContainer.id = todo.id;

  return newTodoContainer;
}
export function onClickEditBtn(e) {
  const inputElement = e.target.previousElementSibling;
  const checkbox = inputElement.previousElementSibling;
  if (!checkbox.checked) {
    inputElement.focus();
  }
}

export function onClickCheckBox(e, todos) {
  const checkbox = e.target;
  if (checkbox.checked) {
    const container = checkbox.parentElement;
    container.style.backgroundColor = "gray";
    container.children[1].style.textDecoration = "line-through";
  } else {
    const container = checkbox.parentElement;
    container.style.backgroundColor = "white";
    container.children[1].style.textDecoration = "none";
  }
  const todoId = Number(checkbox.parentElement.id);
  const todosIndex = findTodosIndex(todos, todoId);
  todos[todosIndex].checked = checkbox.checked;

  //   console.log(todos);
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

export function onClickRemoveBtn(e, todos) {
  const todoContainer = e.target.parentElement;
  const todoId = Number(todoContainer.id);
  //   console.log(todos);
  const todosIndex = findTodosIndex(todos, todoId);

  todos.splice(todosIndex, 1);
  todoContainer.remove();
  //   console.log(todos);
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
function existsClickedElement(e, clickedElement) {
  console.log(clickedElement);
  if (clickedElement !== null) {
    clickedElement.style.border = "3px solid transparent";
  }

  clickedElement = e.currentTarget;
  clickedElement.style.border = "3px solid dodgerblue";
  console.log(clickedElement);
}

function findTodosIndex(todos, todoId) {
  let todosIndex = 0;
  todos.forEach((todo, i) => {
    if (todo.id === todoId) {
      todosIndex = i;
    }
  });
  return todosIndex;
}
function onChangeInput(e, todos) {
  const todoId = Number(e.target.parentElement.id);
  const todosIndex = findTodosIndex(todos, todoId);
  todos[todosIndex].content = e.target.value;
  localStorage.setItem("todo-list", JSON.stringify(todos));
}
