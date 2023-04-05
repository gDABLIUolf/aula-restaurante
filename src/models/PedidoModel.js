const mongoose = require("mongoose")

const PedidoSchema = new mongoose.Schema({
    atendente: {
        atendente_id: String,
        nome: String,
        cpf: String,
        email: String
    },
    mesa: {
        numero: String
    },
    pratos: [
        {
            prato_id: String,
            nome: String,
            preco: Number,
            info: Object,
            quantidade: Number
        }
    ],
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PedidoModel = mongoose.model("Pedido", PedidoSchema)

module.exports = PedidoModel;