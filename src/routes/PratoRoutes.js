const express = require("express")
const router = express.Router()
const multer = require('multer')
const PratoModel = require("./../models/PratoModel.js")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })

router.get("/pratos", async (req, res) => {
    const pratos = await PratoModel.find({})
    return res.status(200).send(pratos)
})

router.post("/pratos", upload.single("imagem"), async (req, res) => {
    try {
        const pratoCriado = await PratoModel.create({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao,
            imagem: req.file.path,
            info: req.body.info
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

const fs = require("fs")
router.delete("/pratos/:id", async (req, res) => {
    const id = req.params.id;
    const deletado = await PratoModel.findOneAndDelete({ _id: id })
    fs.unlinkSync(deletado.imagem)
    if (!deletado || !deletado._id) {
        return res.status(404).send("prato não encontrado")
    }
    return res.status(200).send(deletado)
})

router.put("/pratos/:id", upload.single("imagem"), async (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = { ...req.body }

    if (req.file && req.file.path) {
        dadosAtualizados.imagem = req.file.path
    }

    const atualizado = await PratoModel.findOneAndUpdate({ _id: id }, dadosAtualizados, { upsert: false, new: true })
    return res.status(200).send(atualizado)
})


module.exports = router