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

    const user = await getUser();

    if (!user) {
        console.log("Usuario no logueado");
        return;
    }

    const text = input.value;

    if (text === "") return;

    await supabaseClient
        .from("Tasks")
        .insert({ text, user_id: user.id })

    getTasks();
    input.value = "";
}

async function getTasks() {

    const user = await getUser();

    if (!user) {
        console.log("Usuario no logueado");
        return;
    }

    const { data, error } = await supabaseClient
        .from("Tasks")
        .select("*")
        .eq("user_id", user.id);

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

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");

registerBtn.addEventListener("click", async () => {
    const { data, error } = await supabase
        .auth
        .signUp({
            email: email.value,
            password: password.value,
        });

    if (error) {
        console.log("Error al registrar:", error);
        return;
    }

    console.log("Usuario registrado:", data.user);
});

loginBtn.addEventListener("click", async () => {
    const { data, error } = await supabase
        .auth
        .signInWithPassword({
            email: email.value,
            password: password.value,
        });

    if (error) {
        console.log("Error al iniciar sesión:", error);
        return;
    }

    console.log("Usuario logueado:", data.user);
});

async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        console.log("Usuario:", user);
    }
}

const supabaseUrl = "https://bfuqqdgngkvlajrepyjl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdXFxZGduZ2t2bGFqcmVweWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTcxNDcsImV4cCI6MjA5NDk5MzE0N30.B1zlQAIdq0FhzEq0cNrRhP1BlmQbdcEN5U3Mi1OCUpw";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);   