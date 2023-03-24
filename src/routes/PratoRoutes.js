const express = require("express")
const router = express.Router()
const PratoModel = require("./../models/PratoModel.js")

router.get("/pratos", async (req, res) => {
    const pratos = await PratoModel.find({})
    return res.status(200).send(pratos)
})

router.post("/pratos", async (req, res) => {
    try {
        const pratoCriado = await PratoModel.create({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao,
            info: req.body.info,
            imagem: req.body.imagem
        })
        return res.status(200).send(pratoCriado);
    }
    catch (error) {
        if (error.code == 11000) {
            return res.status(400).send("Prato já existe")
        }
        return res.status(500).send(error)

    }
})

router.delete("/pratos/:id", async (req, res) => {
    const id = req.params.id;
    const deletado = await PratoModel.findOneAndDelete({ _id: id })

    if (!deletado || !deletado._id) {
        return res.status(404).send("prato não encontrado")
    }
    return res.status(200).send(deletado)
})

router.put("/pratos/:id", async (req, res) => {
    const id = req.params.id;
    const atualizado = await PratoModel.findOneAndUpdate({ _id: id }, req.body, { upsert: false, new: true })
    return res.status(200).send(atualizado)
})


module.exports = router