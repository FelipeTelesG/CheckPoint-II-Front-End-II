
// Página de Registro

//  - Ambos os campos devem ser normalizados (ex: retirar espaços desnecessários);

//  - Nenhum dos campos pode ser vazio/nulo;

//  - O email deve ser de um tipo válido (ex: aplicar expressões regulares);

//  - Os campos “senha” e “repetir senha” devem possuir a mesma informação para serem considerados válidos;

//  - O botão de cadastro deve ser habilitado apenas quando todos os campos do formulário estiverem validados corretamente.

function removeespaco(valor) {
    return valor.trim()
}
function vazio(texto) {
    if (texto?.length == 0) {
        return false;
    }
    return true;
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }

    return (false);
}
function Verificarsenha(senha) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (senha.match(passw)) {
        return true;
    }
    else {
        return false;
    }
}



export { removeespaco, vazio, ValidateEmail, Verificarsenha };