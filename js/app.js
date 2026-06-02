// 1. Inicialización de Supabase al principio del archivo (Evita el SyntaxError)
const supabaseUrl = "https://bfuqqdgngkvlajrepyjl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdXFxZGduZ2t2bGFqcmVweWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MTcxNDcsImV4cCI6MjA5NDk5MzE0N30.B1zlQAIdq0FhzEq0cNrRhP1BlmQbdcEN5U3Mi1OCUpw";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Selectores seguros para evitar conflictos entre la sección de tareas y la de Login
const input = document.querySelector(".input-group input");
const button = document.querySelector(".input-group button");
const list = document.getElementById("tasks");

let tasks = [];

// Cargar tareas guardadas localmente si existen
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
        
        // Crear un contenedor de texto para la tarea
        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = task.Tasks;
        listItem.appendChild(taskTextSpan);

        // Crear el botón de eliminar individual
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Eliminar";
        deleteBtn.addEventListener("click", function() {
            deleteTask(task.id);
        });

        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
    });
}

async function deleteTask(taskId) {
    if (!taskId) {
        console.error("ID de tarea no válido");
        return;
    }

    const { error } = await supabaseClient
        .from("Tasks")
        .delete()
        .eq("id", taskId);

    if (error) {
        console.error("Error al eliminar la tarea de Supabase:", error);
        alert("Error al eliminar: " + error.message);
        return;
    }

    // Recargar las tareas actualizadas de la base de datos
    getTasks();
}

// 4. Lógica de Registro
const registerBtn = document.getElementById("registrar-btn");
registerBtn.addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { data, error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
        console.log("Error al registrar:", error);
        alert("Error al registrar: " + error.message);
        return;
    }

    console.log("Usuario registrado:", data.user);
    alert("¡Usuario registrado con éxito! Verifica tu correo para confirmar.");
});

// 5. Lógica de Inicio de Sesión
const loginBtn = document.getElementById("iniciar-btn");
loginBtn.addEventListener("click", async function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        console.log("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión: " + error.message);
        return;
    }

    console.log("Usuario logueado:", data.user);
    alert("¡Sesión iniciada con éxito!");
    // Cargar las tareas del usuario de forma automática tras iniciar sesión
    getTasks();
});

// Cargar las tareas al iniciar la página
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
