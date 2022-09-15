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

const baseDeDados = localStorage.getItem('objeto') || [];

function salvarCadastro(objeto){

    if(!baseDeDados.length) {

        listaCadastro.push(objeto);
        localStorage.setItem('objeto', JSON.stringify(listaCadastro));
    
    }else{

        const retornoStorage = JSON.parse(baseDeDados);

        retornoStorage.push(objeto);
     
         localStorage.setItem('objeto', JSON.stringify(retornoStorage));

    }

 

   }

botao.addEventListener("click", (evento) => {

    evento.preventDefault();

    console.log("Base de dados", baseDeDados)

    salvarCadastro(objeto)

  

   

});



Nome.addEventListener("blur", (evento) => {

    const nomeCapturado = vazio(removeespaco(Nome.value));

   if(nomeCapturado){ 
    objeto.nome = removeespaco(Nome.value);

    liberaBotao[0] = true;
}else{

    liberaBotao[0] = false;
}





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



    if(liberaBotao.every(item => item)) botao.removeAttribute("disabled"); 
    else botao.setAttribute("disabled" , "disabled"); 

});

senha.addEventListener("blur", (evento) => {
    objeto.senha = senha.value;
    const senhaCapturado = Verificarsenha(senha.value);
  
    console.log("senha Validacao", senhaCapturado);
  
    console.log("objeto senha ", objeto);
  
    if (senhaCapturado) {
      liberaBotao[3] = true;
    }
  
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
  
    if (senha.value === repetirsenha.value) liberaBotao[4] = true;
    else liberaBotao[4] = false;
  
    if (liberaBotao.every((item) => item)) botao.removeAttribute("disabled");
    else botao.setAttribute("disabled", "disabled");
  
    console.log("objeto repetirsenha ", objeto);
  });
     

