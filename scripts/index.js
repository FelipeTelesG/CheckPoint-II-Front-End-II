let botao = document.getElementById("botao");

function desativaBotao(emailClean, senhaClean) {
  if (emailClean == '' || senhaClean == '') {
    botao.disabled = true;
  }
  else {
    botao.disabled = false;
  }
}

let email = document.getElementById("inputEmail");
let emailClean = email.value.trim();

let senha = document.getElementById("inputPassword");
let senhaClean = senha.value.trim();


let loginUsuario = {
  email: "",
  password:""
}

let loginUsuarioJson = "";


function verificaEmail() {
  let email = document.getElementById("inputEmail");
  let emailClean = email.value.trim();
  let emailRegex = /\S+@\S+\.\S+/;
  let validaEmail = emailRegex.test(emailClean);

  if (emailClean == '' || validaEmail == false) {
    email.classList.remove("valid")
    email.classList.add("invalid")
    setErrorFor(email, "Email Invalido")
  }
  else {
    email.classList.remove("invalid")
    email.classList.add("valid")
    setSuccessFor(email)
  }
}


function verificaSenha() {
  let senha = document.getElementById("inputPassword");
  let senhaClean = senha.value.trim();
  
  if (senhaClean == '' || senhaClean.length < 5 ) {
    senha.classList.remove("valid")
    senha.classList.add("invalid")
    setErrorFor(senha, "Senha Invalida")
    botao.disabled = true
  }
  else {
    senha.classList.remove("invalid")
    senha.classList.add("valid")
    setSuccessFor(senha)
    botao.disabled = false
  }
}

function entrar(){
let email = document.getElementById("inputEmail");
let emailClean = email.value.trim();

let senha = document.getElementById("inputPassword");
let senhaClean = senha.value.trim();

  loginUsuario.email = emailClean
  loginUsuario.password = senhaClean

  loginUsuarioJson = JSON.stringify(loginUsuario);
  console.log(loginUsuarioJson)

  loginApi(loginUsuarioJson);
}

function baseUrl(){
  return "https://ctd-todo-api.herokuapp.com/v1"
}

function loginApi(loginUsuarioJson){

  let request = {
    method: "POST",
    headers:{
      'Content-type':'application/json'
    },
    body: loginUsuarioJson
  }

  fetch(`${baseUrl()}/users/login`, request)
    .then(
        function (resultado){
          if(resultado.status == 200 || resultado.status == 201){
            return resultado.json()
          }
          else{
            throw resultado
          }
        }
      )
      .then(
        function (resultado){
          sessionStorage.setItem("jwt", resultado.jwt)
          window.location = "tarefas.html"
        }
      )
      .catch(
        function(erro){
          loginErro(erro)
        }
      )
}

function loginErro(resultado){
  senha.classList.remove("valid")
  senha.classList.add("invalid")
  email.classList.remove("valid")
  email.classList.add("invalid")
  setErrorFor(senha, "Usuário ou senha Incorretos")
}


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

