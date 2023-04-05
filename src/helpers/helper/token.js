const jwt = require("jsonwebtoken")

const SEGREDO = process.env.CHAVE_TOKEN



function gerarToken() {
    const usuario = {
        nome: "gabriel",
        email: "gwolf@gmail.com",
        funcao: "ADM"
    }
    return jwt.sign(usuario, SEGREDO)
}

function validarToken(token) {
    return jwt.verify(token, SEGREDO)
}

module.exports = {
    gerarToken,
    validarToken
}