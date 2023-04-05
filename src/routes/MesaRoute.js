const express = require('express')
const router = express.Router()
const autenticar = require("../middleware/Autenticador")
const MesaModel = require("./../models/MesaModel.js")

router.get('/mesa', autenticar(["ADM", "GERENTE"]), async (req, res) => {
    const mesas = await MesaModel.find()
    return res.status(200).send(mesas)
})

router.post("/mesa", autenticar(["ADM", "GERENTE"]), async (req, res) => {
    try {
        const mesaCriada = await MesaModel.create({
            numero: req.body.numero
        })
        return res.status(200).send(mesaCriada)
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send("Número de mesa já existe")
        }
        return res.status(500).send(error)
    }
})

router.delete("/mesa/:numero", autenticar(["ADM", "GERENTE"]), async (req, res) => {
    const numero = req.params.numero;
    const deletado = await MesaModel.findOneAndDelete({ numero: numero })

    if (!deletado || !deletado._id) {
        return res.status(404).send("Mesa não encontrada")
    }
    return res.status(200).send(deletado)
})

module.exports = router
