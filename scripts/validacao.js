
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
    var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

    return passw.test(senha)
}



export { removeespaco, vazio, ValidateEmail, Verificarsenha };