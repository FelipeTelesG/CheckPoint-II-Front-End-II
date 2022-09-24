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

// const baseDeDados = localStorage.getItem('objeto') || [];

// function salvarCadastro(objeto){

//     if(!baseDeDados.length) {

//         listaCadastro.push(objeto);
//         localStorage.setItem('objeto', JSON.stringify(listaCadastro));

//     }else{

//         const retornoStorage = JSON.parse(baseDeDados);

//         retornoStorage.push(objeto);

//          localStorage.setItem('objeto', JSON.stringify(retornoStorage));

//     }



//    }

botao.addEventListener("click", (evento) => {
    setTimeout(() =>{
        location = "index.html" 
      }, 2000)

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

        liberaBotao[3] = true;
    }
    
    console.log("REPETIR_SENHA", objeto.repetirsenha)

    if (objeto.repetirsenha) {


        if (objeto.senha === objeto.repetirsenha) liberaBotao[3] = true;
        else liberaBotao[3] = false;
    }

    if (liberaBotao.every((item) => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");

    console.log("senha", liberaBotao);
});

repetirsenha.addEventListener("blur", (evento) => {
    objeto.repetirsenha = repetirsenha.value;
    const repetirSenhaCapturado = Verificarsenha(repetirsenha.value);

    if (repetirSenhaCapturado) {
        objeto.repetirsenha = repetirsenha.value;
    }

    if (senha.value === repetirsenha.value){
        liberaBotao[4] = true;
        senha.classList.remove("invalid")
        senha.classList.add("valid")
        repetirsenha.classList.remove("invalid")
        repetirsenha.classList.add("valid")
        setSuccessFor(repetirsenha)
    } 
    else{
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

                } else if (resultado.status == 400) {

                    throw "O usuário já está cadastrado!";

                } else {
                    throw "Erro no servidor!";
                }
            }
        )
        .then(
            function (resultado) {
                console.log(resultado);
                sessionStorage.setItem("jwt-cadastro", resultado.jwt)

            }
        )
        .catch(
            function (erro) {
                console.log(erro)
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

function exibeSpinner(){
    let div = document.createElement("div");
    div.classList.add("loader")
    botao.innerText = ""
    botao.appendChild(div);
  }




