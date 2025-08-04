const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load saved tasks
window.onload = function () {
  tasks.forEach(task => renderTask(task));
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value;
  const taskTime = taskDate.value;

  if (!taskText.trim()) return;

  const task = {
    text: taskText,
    time: taskTime,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  taskInput.value = "";
  taskDate.value = "";
});

function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-item";

  const taskText = document.createElement("span");
  taskText.textContent = ${task.text} ${task.time ? "- " + new Date(task.time).toLocaleString() : ""};
  if (task.completed) taskText.classList.add("completed");

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.onclick = () => {
    task.completed = !task.completed;
    saveTasks();
    taskText.classList.toggle("completed");
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "✎";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", task.text);
    if (newText) {
      task.text = newText;
      saveTasks();
      taskText.textContent = ${newText} ${task.time ? "- " + new Date(task.time).toLocaleString() : ""};
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.onclick = () => {
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    saveTasks();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskText);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function saveTasks()