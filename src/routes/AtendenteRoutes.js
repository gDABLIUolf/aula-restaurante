const express = require("express")
const DB_ATENDENTE = require("../database/AtendenteDB")
const router = express.Router()

router.get("/atendente", (req, res) => {
    return res.status(200).send(DB_ATENDENTE)
})

router.post("/atendente", (req, res) => {
    DB_ATENDENTE.push(req.body)
    return res.status(200).send("Atendente inserido com sucesso")
})

router.delete("/atendente/:id", (req, res) => {
    const id = req.params.id
    let idAtendente = DB_ATENDENTE.findIndex(atendente => atendente.id == id)
    if (idAtendente != -1) {
        DB_ATENDENTE.splice(idAtendente, 1)
        return res.status(200).send("Atendente deletado com sucesso")
    }
    return res.status(404).send("Atendente não encontrado")

})

router.put("/atendente/:id", (req, res) => {
    const id = req.params.id
    const idx = DB_ATENDENTE.findIndex(atendente => atendente.id == id)
    if (idx != -1) {
        DB_ATENDENTE[idx] = {
            id: req.params.id,
            nome: req.body.nome,
            telefone: req.body.telefone
        }
        return res.status(200).send("Atendente editado com sucesso")
    }
    return res.status(404).send("Atendente não encontrado")
})

module.exports = router