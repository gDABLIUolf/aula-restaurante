const express = require("express")
const router = express.Router()
const AtendenteModel = require("./../models/AtendenteModel.js")
const md5 = require("md5")


router.get("/atendente", async (req, res) => {
    const atendentes = await AtendenteModel.find({})
    return res.status(200).send(atendentes)
})

router.get("/atendente/:cpf", async (req, res) => {
    const cpf = req.params.cpf
    const atendente = await AtendenteModel.find({ cpf: cpf })
    return res.status(200).send(atendente)
})

router.post("/atendente", async (req, res) => {
    try {
        const atendenteCriado = await AtendenteModel.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            telefone: req.body.telefone,
            senha: md5(req.body.senha)
        })
        return res.status(200).send(AtendenteCriado)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send("Atendente já existe")
        }
        return res.status(500).send(error)
    }
})

router.delete("/atendente/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const deletado = await AtendenteModel.findOneAndDelete({ cpf: cpf })

    if (!deletado || !deletado._id) {
        return res.status(404).send("Atendente não encontrada")
    }
    return res.status(200).send(deletado)
})

router.put("/atendente/:id", async (req, res) => {
    const id = req.params.id;
    const atualizado = await AtendenteModel.findOneAndUpdate({ _id: id }, req.body, { upsert: false, new: true })
    return res.status(200).send(atualizado)
})

module.exports = router