const mongoose = require("mongoose")

const PratoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    descricao: String,
    info: Object,
    imagem: String
}, { timestamps: true })

const PratoModel = mongoose.model("Prato", PratoSchema)

module.exports = PratoModel;