const chave = process.env.CHAVE_TOKEN
const tokenHelper = require("./../helpers/helper/token")

function autenticar(funcoes = []) {
    return (req, res, next) => {
        try {
            const token = req.headers.token
            const conteudo = tokenHelper.validarToken()
            if (funcoes.includes(conteudo.funcao)) {
                return next()
            }
            return res.status(403).send("Proibido")
        } catch (error) {
            return res.status(401).send({
                mensagem: "não autorizado",
                err: error
            })
        }

    }

}

module.exports = autenticar