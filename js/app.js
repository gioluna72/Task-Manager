const input = document.querySelector("input"); //Selecciona el input
const button = document.querySelector("button"); //Selecciona el boton
const tasks = document.querySelector("ul"); //Selecciona la lista

button.addEventListener("click", () => { //Se activa al dar click al boton
    const newItem = document.createElement("li"); //Se crea un nuevo elemento
    newItem.textContent = input.value; //Se asigna el valor del input al nuevo elemento
    tasks.appendChild(newItem); //Se agrega el nuevo elemento a la lista
    input.value = ""; //Se limpia el input
});

function newTask() { //Se define una funcion
    if (input.value.trim() === "") return; // Se asegura de que el input no esté vacío
    const newItem = document.createElement("li"); //Se crea un nuevo elemento
    newItem.textContent = input.value; //Se asigna el valor del input al nuevo elemento
    tasks.appendChild(newItem); //Se agrega el nuevo elemento a la lista
    input.value = ""; //Se limpia el input
}   