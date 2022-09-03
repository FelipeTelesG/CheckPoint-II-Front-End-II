import { removeespaco, vazio, ValidateEmail } from "./validacao.js";


const botao = document.getElementById("botao");

const Nome = document.getElementById("Nome");
const sobrenome = document.getElementById("Sobrenome");
const email = document.getElementById("Email");
const senha = document.getElementById("Senha");
const repetirsenha = document.getElementById("RepetirSenha");


const liberaBotao = [false, false, false, false, false];

const objeto = {};


botao.addEventListener("click", (evento) => {

    evento.preventDefault();

    console.log("teste")

});



Nome.addEventListener("blur", (evento) => {

    const nomeCapturado = vazio(removeespaco(Nome.value));

   if(nomeCapturado){ 
    objeto.nome = removeespaco(Nome.value);

    liberaBotao[0] = true;
}else{

    liberaBotao[0] = false;
}



console.log("objeto", objeto)

if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
else botao.setAttribute("disabled" , "disabled"); 

});




sobrenome.addEventListener("blur", (evento) => {

    const sobrenomeCapturado = vazio(removeespaco(sobrenome.value));

    if(sobrenomeCapturado){ 
        objeto.sobrenome = sobrenome.value;
    
        liberaBotao[1] = true;
    }else{

        liberaBotao[1] = false;
    }
    


console.log("tem sobrenomenome", sobrenomeCapturado)
console.log("tem sobrenomenome obj", objeto)

if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
else botao.setAttribute("disabled" , "disabled"); 

});

email.addEventListener("blur", (evento) => {

    const emailCapturado = ValidateEmail(email.value);

    if(emailCapturado){ 
        objeto.email = email.value;
    
        liberaBotao[2] = true;
    }else{

        liberaBotao[2] = false;
    }

    console.log("tem email",emailCapturado )
    console.log("tem email obj", objeto)

    if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
    else botao.setAttribute("disabled" , "disabled"); 

});

senha.addEventListener("blur", (evento) => {

    const senhaCapturado = vazio(removeespaco(senha.value));

    if(senhaCapturado){ 
        objeto.senha = senha.value;
    
        liberaBotao[3] = true;
    }


    if(objeto.senha === objeto.repetirsenha) liberaBotao[3] = true;
    else liberaBotao[3] = false;

    console.log("tem email",senhaCapturado )
    console.log("tem email obj", objeto)


    if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
    else botao.setAttribute("disabled" , "disabled"); 


});

repetirsenha.addEventListener("blur", (evento) => {

    const repetirSenhaCapturado = vazio(removeespaco(repetirsenha.value));

    if(repetirSenhaCapturado ){ 
        objeto.repetirsenha = repetirsenha.value;
    
        
    }

    if(objeto.senha === objeto.repetirsenha) liberaBotao[4] = true;
    else liberaBotao[4] = false;

    console.log("tem email",repetirSenhaCapturado )
    console.log("tem email obj", objeto)


        console.log(liberaBotao)

      if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
      else botao.setAttribute("disabled" , "disabled"); 

});

