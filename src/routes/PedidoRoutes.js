const express = require("express")
const MesaModel = require("../models/MesaModel.js")
const router = express.Router()
const PedidoModel = require("./../models/PedidoModel.js")
const AtendenteModel = require('./../models/AtendenteModel')
const PratoModel = require('./../models/PratoModel')

router.get("/pedidos", async (req, res) => {
    const pedidos = await PedidoModel.find({})
    return res.status(200).send(pedidos)
})

router.get("/pedidos/:id", async (req, res) => {
    const id = req.params.id
    const pedido = await PedidoModel.findOne({ _id: id })

    if (!pedido || !pedido._id) {
        return res.status(404).send("Pedido não existe")
    }

    return res.status(200).send(pedido)
})

router.post("/pedidos", async (req, res) => {
    const { atendente_id, mesa_id, pratos } = req.body
    // buscar a mesa por ID
    const mesa = await MesaModel.findOne({ _id: mesa_id })
    if (!mesa || !mesa._id) {
        return res.status(400).send("Mesa informada não existe!")
    }

    // buscar o atendente por ID
    const atendente = await AtendenteModel.findOne({ _id: atendente_id })
    if (!atendente || !atendente._id) {
        return res.status(400).send("Atendente não existe!")
    }
    // Buscar todos os pratos por ID
    const listaPratosFinal = []
    for (let i = 0; i < pratos.length; i++) {
        const pratoItem = pratos[i];
        const pratoBD = await PratoModel.findOne({ _id: pratoItem.prato_id })

        if (!pratoBD || !pratoBD._id) {
            return res.status(400).send("Prato não existe!")
        }
        listaPratosFinal.push({
            quantidade: pratoItem.quantidade,
            prato_id: pratoBD._id,
            nome: pratoBD.nome,
            preco: pratoBD.preco,
            info: pratoBD.info,
        })
    }
    // criar o Pedido
    const pedidoCriado = await PedidoModel.create({

        atendente: {
            atendente_id: atendente._id,
            nome: atendente.nome,
            cpf: atendente.cpf,
            email: atendente.email,
        },
        mesa: {
            numero: mesa.numero
        },
        pratos: listaPratosFinal,
        status: 'Em Preparo'
    })
    return res.status(200).send(pedidoCriado)
})

router.put('/pedido/:id', async (req, res) => {
    const id = req.params.id
    const atualizado = await PedidoModel.findOneAndUpdate({ _id: id }, req.body, { upsert: false, new: true })
    return res.status(200).send(atualizado)
})

router.put('/finalizar-pedido/:id', async (req, res) => {
    //encontrar pedido
    const pedido = await PedidoModel.findOne({ _id: req.params.id })

    if (!pedido || !pedido._id) {
        res.status(400).send("Prato não encontrao")
    }
    // mudar status
    pedido.status = "Finalizado"
    let soma = 0
    for (const prato of pedido.pratos) {
        const precoTotalPrato = prato.preco * prato.quantidade
        soma += precoTotalPrato
    }
    // calcular preco total
    const pedidoFinalizado = await PedidoModel.findOneAndUpdate({ _id: pedido._id }, pedido, { upsert: false, new: true })
    // devolver resultado
    return res.status(200).send({ pedido: pedidoFinalizado, valorTotal: soma })
})

module.exports = router