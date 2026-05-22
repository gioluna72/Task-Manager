const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

let tasks = [];

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
}

button.addEventListener("click", addTask);

function addTask() {    
    const text = input.value;
    if(text === "") return;
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    input.value = "";
}

function renderTasks() {
    list.innerHTML = ""; 

    tasks.forEach(function(task) {
        const listItem = document.createElement("li");
        listItem.textContent = task;
        list.appendChild(listItem); 
    });
}

function deleteTask() {
    tasks.pop();
    renderTasks();
}   
