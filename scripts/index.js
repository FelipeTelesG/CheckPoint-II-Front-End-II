let botao = document.getElementById("botao");

let email = document.getElementById("inputEmail");
let emailClean = email.value.trim();

let senha = document.getElementById("inputPassword");
let senhaClean = senha.value.trim();

let dadosUser = localStorage.getItem('objeto');
// transformar em objeto novamente
let dadosUserObj = JSON.parse(dadosUser);

let senhaUsuario = dadosUserObj.senha;
let emailUsuario = dadosUserObj.email;

function desativaBotao(emailClean, senhaClean) {
  if (emailClean == '' || senhaClean == '') {
    botao.disabled = true;
  }
  else {
    botao.disabled = false;
  }
}

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
  let senhaUsuario = dadosUserObj.senha

  if (senhaClean == '' || senhaClean.length < 5 || senhaClean !== senhaUsuario) {
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

function entrar(senhaClean, senhaUsuario, emailClean, emailUsuario) {
  if (senhaClean === senhaUsuario && emailClean === emailUsuario) {
    window.location.href = "./tarefas.html"
  }
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


