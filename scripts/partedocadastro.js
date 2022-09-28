import { removeespaco, vazio, ValidateEmail, Verificarsenha } from "./validacao.js";

const botao = document.getElementById("botao");
const Nome = document.getElementById("Nome");
const sobrenome = document.getElementById("Sobrenome");
const email = document.getElementById("Email");
const senha = document.getElementById("Senha");
const repetirsenha = document.getElementById("RepetirSenha");

const liberaBotao = [false, false, false, false, false];

const objeto = {};

const listaCadastro = [];

botao.addEventListener("click", (evento) => {
    exibeSpinner()

    evento.preventDefault();

    console.log("Base de dados", baseDeDados)

    salvarCadastro(objeto)

});

Nome.addEventListener("blur", (evento) => {

    const nomeCapturado = vazio(removeespaco(Nome.value));

    if (nomeCapturado) {
        objeto.nome = removeespaco(Nome.value);

        liberaBotao[0] = true;
    } else {

        liberaBotao[0] = false;
    }

    if (liberaBotao.every(item => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

});

sobrenome.addEventListener("blur", (evento) => {

    const sobrenomeCapturado = vazio(removeespaco(sobrenome.value));

    if (sobrenomeCapturado) {
        objeto.sobrenome = sobrenome.value;

        liberaBotao[1] = true;
    } else {

        liberaBotao[1] = false;
    }

    if (liberaBotao.every(item => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

});

email.addEventListener("blur", (evento) => {

    const emailCapturado = ValidateEmail(email.value);

    if (emailCapturado) {
        objeto.email = email.value;
        email.classList.remove("invalid")
        email.classList.add("valid")
        setSuccessFor(email)
        liberaBotao[2] = true;
    } else {
        email.classList.remove("valid")
        email.classList.add("invalid")
        setErrorFor(email, "Insira um e-mail Válido!")
        liberaBotao[2] = false;
    }

    if (liberaBotao.every(item => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

});

senha.addEventListener("blur", (evento) => {
    objeto.senha = senha.value;

    const senhaCapturado = Verificarsenha(senha.value);


    if (senhaCapturado) {
        setSuccessFor(senha)
        liberaBotao[3] = true;

    }
    else{
        liberaBotao[3] = false;
        setErrorFor(evento.currentTarget, "A senha deve possuir no mínimo 7 caracteres, com um ou mais caractere especial e número!")
    }


    console.log("REPETIR_SENHA", objeto.repetirsenha)

    if (liberaBotao.every((item) => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

    console.log("senha", liberaBotao);
});

repetirsenha.addEventListener("keyup", (evento) => {
    objeto.repetirsenha = repetirsenha.value;
    const repetirSenhaCapturado = Verificarsenha(repetirsenha.value);

    if (repetirSenhaCapturado) {
        objeto.repetirsenha = repetirsenha.value;
    }

    if (senha.value === repetirsenha.value) {
        liberaBotao[4] = true;
        // liberaBotao[3] = true;
        senha.classList.remove("invalid")
        senha.classList.add("valid")
        repetirsenha.classList.remove("invalid")
        repetirsenha.classList.add("valid")
        setSuccessFor(repetirsenha)
        console.log(repetirSenhaCapturado);
    }
    else {
        liberaBotao[4] = false
        senha.classList.remove("valid")
        senha.classList.add("invalid")
        repetirsenha.classList.remove("valid")
        repetirsenha.classList.add("invalid")
        setErrorFor(repetirsenha, "As senhas devem ser Iguais!")
    }

    if (liberaBotao.every((item) => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

    console.log("objeto repetirsenha ", objeto);
});


function baseUrl() {
    return "https://ctd-fe2-todo-v2.herokuapp.com/v1"
}

botao.addEventListener("click", (evento) => {
    evento.preventDefault();

    const objCaptura = {
        "firstName": Nome.value,
        "lastName": sobrenome.value,
        "email": email.value,
        "password": senha.value
    }

    console.log("OBJETO", objCaptura)

    let request = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objCaptura),
    }

    fetch("https://ctd-fe2-todo-v2.herokuapp.com/v1/users", request)
        .then(
            function (resultado) {
                if (resultado.status == 200 || resultado.status == 201) {

                    return resultado.json()

                } else {
                    throw resultado
                }
            }
        )
        .then(
            function (resultado) {
                console.log(resultado);

                setTimeout(() => {
                    Swal.fire(
                        'Good job!',
                        'Usuario cadastrado com sucesso!',
                        'success'
                    )
                }, 1000)

                setTimeout(() => {
                    location = "index.html"
                }, 4000)

                sessionStorage.setItem("jwt-cadastro", resultado.jwt)
            }
        )
        .catch(
            function (erro) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuário já cadastrado!',
                    footer: '<a href="index.html">Fazer Login</a>'
                })
            }
        )
})

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = message

    formControl.className = 'form-control error'
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.className = 'form-control success'
}

function exibeSpinner() {
    let div = document.createElement("div");
    div.classList.add("loader")
    botao.innerText = ""
    botao.appendChild(div);
}