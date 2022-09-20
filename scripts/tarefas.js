window.onload = () => {
    let root = document.querySelector(":root")
    let body = document.querySelector('body')

    let ulDone = document.querySelector(".tarefas-terminadas")
    let divTasks = document.querySelector(".divTasks");
    let novaTarefa = document.getElementById("novaTarefa")

    let tituloTerminadas = document.querySelector(".titulo-terminadas")

    let closeApp = document.querySelector("#closeApp")
    closeApp.addEventListener('click', endSession)

    let button = document.querySelector("button")
    button.addEventListener('click', addButtonEvents)

    let token = JSON.parse(sessionStorage.getItem('jwt'))
    let userImage = document.querySelector("#imagem-user")
    let userName = document.getElementById("usuario");
    
    let toggleMode = document.getElementById("toggleMode")
    toggleMode.addEventListener("click", switchMode)

    function baseUrl() {
        return "https://ctd-todo-api.herokuapp.com/v1"
    }

    function endSession(event) {
        event.preventDefault;
        sessionStorage.clear()
        location = "index.html"

    }

    function loadingAnimation() {
        divTasks.setAttribute("id", "skeleton")
        ulDone.setAttribute("id", "skeleton")
        setTimeout(() => {
            divTasks.removeAttribute("id")
            ulDone.removeAttribute("id")
        }, 1000)
    }
    function changeColors() {
        if (ulDone.children.length == 0) {
            if (tituloTerminadas.classList.contains('dark-title')) {
                tituloTerminadas.style.backgroundColor = "white"; tituloTerminadas.style.color = "black"
            } else {
                tituloTerminadas.style.backgroundColor = "white"
                tituloTerminadas.style.color = "rgb(170, 170, 170)"
            }
        }
        else {
            if (tituloTerminadas.classList.contains('dark-title')) {
                console.log(tituloTerminadas.classList.contains('dark-title'));
                tituloTerminadas.style.backgroundColor = "#373940"; tituloTerminadas.style.color = "white"


            } else {
                tituloTerminadas.style.backgroundColor = "#7e8aef"; tituloTerminadas.style.color = "white"


            }

        }
    }
    function switchMode() {
        body.classList.toggle('dark-body')
        root.classList.toggle("dark")
        tituloTerminadas.classList.toggle("dark-title")
        localStorage.setItem("hasDarkMode", `${body.classList.contains('dark-body')}`)
        changeColors()
    }
    function savedMode(){
        if(JSON.parse(localStorage.getItem("hasDarkMode"))) {
            body.classList.add('dark-body')
            root.classList.add("dark")
            tituloTerminadas.classList.add("dark-title")
            toggleMode.checked = "true"
        }

    }

    function addButtonEvents(event) {
        event.preventDefault()
        sendTasks(novaTarefa.value)

    }
    function reloadPageInformations() {
        getUserName()
        getTasks()
        loadingAnimation()
        savedMode()

    }

    function createTasks(name, timestamp, done, id) {
        let liElement = document.createElement("li")
        liElement.classList.add("tarefa")
        liElement.setAttribute("id", `${id}`)
        liElement.innerHTML =
            `
            <div class="not-done"></div>
            <div class="descricao">
              <p class="nome">${name}</p>
              <p class="timestamp">Criada em: ${timestamp}</p>
            </div>
          `
        if (done == true) {
            ulDone.append(liElement)
            liElement.style.textDecoration = "line-through"
            liElement.classList.add("done")
        }
        else {
            divTasks.append(liElement)
        }
        liElement.addEventListener('click', doneTask)
        document.forms[0].reset()
        changeColors()

    }
    function renderUserProfile(json) {
        userName.innerText = `${json.firstName} ${json.lastName}`
        userImage.setAttribute("src", `https://avatars.dicebear.com/api/bottts/${json.lastName}.svg`)
    }

    function doneTask(event) {
        let currentLi = event.currentTarget
        currentLi.classList.toggle("done")
        let taskContent = (currentLi.childNodes[3]).childNodes[1].innerHTML;
        let body = JSON.stringify({
            description: taskContent,
            completed: currentLi.classList.contains("done")
        })
        let request = {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: body,
            redirect: 'follow'
        }
        fetch(`${baseUrl()}/tasks/${currentLi.id}`, request)
            .then(
                function (resultado) {
                    if (resultado.status == 200 || resultado.status == 201) {
                        return resultado.json()
                    }
                    else {
                        throw resultado
                    }
                }
            )
            .then(
                function (resultado) {
                    console.log(resultado.completed);
                    resultado.completed == true ? ulDone.append(currentLi) : divTasks.append(currentLi), currentLi.style.textDecoration = "none"
                    changeColors()

                }
            )
            .catch(
                function (erro) {
                    console.error(erro);

                })

    }
    function sendTasks(description) {
        if (description.trim() == '') {
            return
        }
        const body = {
            description: `${description}`,
            completed: false
        }
        let request = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            redirect: 'follow'
        }
        fetch(`${baseUrl()}/tasks`, request)
            .then(
                function (resultado) {
                    if (resultado.status == 200 || resultado.status == 201) {
                        return resultado.json()
                    }
                    else {
                        throw resultado
                    }
                }
            )
            .then(
                function (resultado) {
                    createTasks(description, resultado.createdAt, resultado.completed, resultado.id)
                }
            )
            .catch(
                function (erro) {
                    console.error(erro);

                })
    }
    function getUserName() {
        let request = {
            method: 'GET',
            headers: {
                'Authorization': token,

            },
            redirect: 'follow'
        }
        fetch(`${baseUrl()}/users/getMe`, request)
            .then(
                function (response) {
                    if (response.status == 200 || response.status == 201) {
                        return response.json()
                    }
                    else {
                        throw response
                    }
                }
            )
            .then(
                function (response) {
                    renderUserProfile(response)
                }
            )
    }
    function getTasks() {
        let request = {
            method: 'GET',
            headers: {
                'Authorization': token,

            },
            redirect: 'follow'
        }
        fetch(`${baseUrl()}/tasks`, request)
            .then(
                function (resultado) {
                    if (resultado.status == 200 || resultado.status == 201) {
                        return resultado.json()
                    }
                    else {
                        throw resultado
                    }
                }
            )
            .then(
                function (resultado) {
                    if (resultado) {
                        resultado.forEach(element => {
                            createTasks(element.description, element.createdAt, element.completed, element.id)
                        });
                        console.log(resultado);
                    }
                }
            )
        // .catch(
        //     function (erro) {
        //         loginErro(erro)
        //     }
        // )
    }
    reloadPageInformations()


}

