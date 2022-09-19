window.onload = () => {

    let ulDone = document.querySelector(".tarefas-terminadas")
    let divTasks = document.querySelector(".divTasks");
    let novaTarefa = document.getElementById("novaTarefa")
   
    let tituloTerminadas = document.querySelector(".titulo-terminadas")
    
    let closeApp = document.querySelector("#closeApp")
    closeApp.addEventListener('click', endSession)
    
    let button = document.querySelector("button")
    button.addEventListener('click', addButtonEvents)

    let token = JSON.parse(sessionStorage.getItem('jwt'))
    let imagemUser = document.querySelector("#imagem-user")
    // imagemUser.src = "https://tm.ibxk.com.br/2017/06/22/22100428046161.jpg"

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
    function changingTitleBackground() {
        if (ulDone.children.length == 0) {
            tituloTerminadas.style.backgroundColor = "white"
            tituloTerminadas.style.color = "rgb(170, 170, 170)"
        }
        else {
            tituloTerminadas.style.backgroundColor = "#7b90f6"; tituloTerminadas.style.color = "white"

        }
    }

    function addButtonEvents(event) {
        event.preventDefault()
        sendTasks(novaTarefa.value)
    }
    function reloadTasks() {
        changingTitleBackground()
        getTasks()
        getUserName()
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
    }
    function renderUserName(json) {
        let userName = document.getElementById("usuario");
        userName.innerText = `${json.firstName} ${json.lastName}`
        
        
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
                }
            )
            .catch(
                function (erro) {
                    console.error(erro);

                })

        changingTitleBackground()
    }
    function sendTasks(description) {
        if(!description) {
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
                renderUserName(response)
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

    reloadTasks()
    loadingAnimation()


}

