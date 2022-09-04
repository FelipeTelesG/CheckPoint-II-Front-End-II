let botao = document.getElementById("botao");

botao.addEventListener("click", (event) =>{
    event.preventDefault();

    botao.setAttribute("disable", "")
    
    let email = document.getElementById("inputEmail");
    let senha = document.getElementById("inputPassword");

    let emailClean = email.value.trim();
    let senhaClean = senha.value.trim();

    let emailRegex = /\S+@\S+\.\S+/;
    let validaEmail = emailRegex.test(emailClean);

    let dadosUser = localStorage.getItem('objeto');
    // transformar em objeto novamente
    let dadosUserObj = JSON.parse(dadosUser);


    if(emailClean == '' || validaEmail == false || emailClean !== dadosUserObj.email){
      email.classList.remove("valid")
      email.classList.add("invalid")
      setErrorFor(email, "Email Invalido")
    }
    else{
      email.classList.remove("invalid")
      email.classList.add("valid")
      setSuccessFor(email)
    }

    if(senhaClean == '' || senhaClean.length < 5 || senhaClean !== dadosUserObj.senha){
      senha.classList.remove("valid")
      senha.classList.add("invalid")
      setErrorFor(senha, "Senha Invalida") 

    }
    else{
      senha.classList.remove("invalid")
      senha.classList.add("valid")
      setSuccessFor(senha) 
      entrar()
    }

    function entrar(){
      if(senhaClean === dadosUserObj.senha && emailClean === dadosUserObj.email){
        window.location.href = "./tarefas.html"
      }
    }

console.log(emailClean)
console.log(senhaClean)

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


