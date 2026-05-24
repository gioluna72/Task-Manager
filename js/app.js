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

async function addTask() {
    const text = input.value;
    if (text === "") return;

    await supabase
        .from("tasks")
        .insert({ text })

    getTasks();
    input.value = "";
}

async function getTasks() {
    const { data, error } = await supabase
        .from("Tasks")
        .select("*");

    if (error) {
        console.log("Error al obtener las tareas:", error);
        return;
    }

    tasks = data;
    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(function (task) {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        list.appendChild(listItem);
    });
}

function deleteTask() {
    tasks.pop();
    renderTasks();
}

getTasks();

const supabaseUrl = "https://bfuqqdgngkvlajrepyjl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdXFxZGduZ2t2bGFqcmVweWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTcxNDcsImV4cCI6MjA5NDk5MzE0N30.B1zlQAIdq0FhzEq0cNrRhP1BlmQbdcEN5U3Mi1OCUpw";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);   