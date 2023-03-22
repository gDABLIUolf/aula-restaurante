const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    numero: {
        type: String,
        unique: true,
        require: true,
    }
})

const MesaModel = mongoose.model("Mesa", MesaSchema)

module.exports = MesaModel;