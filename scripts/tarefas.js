
window.onload = () => {

let divTasks = document.querySelector(".divTasks");
let novaTarefa = document.getElementById("novaTarefa")
let button = document.querySelector("button")
const taskData = []

button.addEventListener('click', addButtonEvents)

function addButtonEvents(event) {
    saveTaskData(novaTarefa.value, 'timestamp')
    createTasks(novaTarefa.value, 'timestamp')
    event.preventDefault()
}
function reloadTasks(){
    if (localStorage.getItem("taskData")) {
        let localTaskData = JSON.parse(localStorage.getItem("taskData"))
        localTaskData.forEach(element => {
            taskData.push(element)
            createTasks(element.name, element.date)
        });
    }
    else {
        console.log("sem elemento para puxar");
    }
}
function createTasks(name, timestamp) {
    let liElement = document.createElement("li")
    liElement.classList.add("tarefa")
    liElement.innerHTML =
    `
        <div class="not-done"></div>
        <div class="descricao">
          <p class="nome">${name}</p>
          <p class="timestamp">Criada em: ${timestamp}</p>
        </div>
      `
    divTasks.append(liElement)
    document.forms[0].reset()
}

function saveTaskData(value, date) {
    let newTask = {
        name: `${value}`,
        date: `${date}` 
    }
    taskData.push(newTask)
    localStorage.setItem("taskData", JSON.stringify(taskData))
}
reloadTasks()
}
