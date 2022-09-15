window.onload = () => {
    // let userLogin = document.getElementById("usuario");
    // let dadosUser = localStorage.getItem('objeto');
    // transformar em objeto novamente
    // let dadosUserObj = JSON.parse(dadosUser);
    // let userName = dadosUserObj.nome
    // userLogin.innerHTML = userName
    let ulDone = document.querySelector(".tarefas-terminadas")
    let divTasks = document.querySelector(".divTasks");
    let novaTarefa = document.getElementById("novaTarefa")
    let button = document.querySelector("button")
    let tituloTerminadas = document.querySelector(".titulo-terminadas")
    const taskData = []

    function loadingAnimation() {
        divTasks.setAttribute("id", "skeleton")
        ulDone.setAttribute("id", "skeleton")
        setTimeout(() => {
            divTasks.removeAttribute("id")
            ulDone.removeAttribute("id")
        }, 1000)
    }
    function changingTitleBackground() {
        if (ulDone.children.length == 0) {
            tituloTerminadas.style.backgroundColor = "white"
            tituloTerminadas.style.color = "rgb(170, 170, 170)"
        }
        else {
            tituloTerminadas.style.backgroundColor = "#7b90f6"; tituloTerminadas.style.color = "white"

        }
    }
    loadingAnimation()
    button.addEventListener('click', addButtonEvents)

    function addButtonEvents(event) {
        saveTaskData(novaTarefa.value,)
        createTasks(novaTarefa.value,)
        event.preventDefault()
    }
    function reloadTasks() {
        if (localStorage.getItem("taskData")) {
            let localTaskData = JSON.parse(localStorage.getItem("taskData"))
            localTaskData.forEach(element => {
                taskData.push(element)
                createTasks(element.name, element.date, element.done)
            });
        }
        else {
            console.log("sem elemento para puxar");
        }
        changingTitleBackground()
    }
    function createTasks(name, timestamp, done) {
        if (!timestamp) {
            timestamp = new Date().toUTCString();
        }
        let liElement = document.createElement("li")
        liElement.classList.add("tarefa")
        liElement.setAttribute("id", `${taskData.length - 1}`)
        liElement.innerHTML =
            `
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${name}</p>
              <p class="timestamp">Criada em: ${timestamp}</p>
            </div>
          `
        if (done) {
            ulDone.append(liElement)
            liElement.style.textDecoration = "line-through"
        }
        else {
            divTasks.append(liElement)
        }
        liElement.addEventListener('click', doneTask)
        document.forms[0].reset()
    }
    function doneTask(event) {
        let currentLi = event.currentTarget
        if (taskData[`${currentLi.id}`].done) {
            currentLi.style.textDecoration = "none"
            divTasks.append(currentLi)
            taskData[`${currentLi.id}`].done = false
            localStorage.removeItem("taskData")
            localStorage.setItem("taskData", JSON.stringify(taskData))
        }
        else {
            currentLi.style.textDecoration = 'line-through'
            ulDone.append(currentLi)
            taskData[`${currentLi.id}`].done = true;
            localStorage.removeItem("taskData")
            localStorage.setItem("taskData", JSON.stringify(taskData))

        }
        changingTitleBackground()
    }
    function saveTaskData(value, date) {
        date = new Date().toUTCString();
        let newTask = {
            id: `${taskData.length}`,
            name: `${value}`,
            date: `${date}`,
            done: false,
        }
        taskData.push(newTask)
        localStorage.setItem("taskData", JSON.stringify(taskData))
    }
    reloadTasks()


}
