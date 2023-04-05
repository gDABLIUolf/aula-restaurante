const express = require('express')
require("./database/mongoDB")
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).send('Api do restaurante HT')
})

// ROTAS - mesa
const MesaRoute = require('./routes/MesaRoute')
app.use(MesaRoute)

// ROTAS - atendente
const AtendenteRoute = require("./routes/AtendenteRoutes")
app.use(AtendenteRoute)

// ROTAS - atendente
const pratoRoute = require("./routes/PratoRoutes")
app.use(pratoRoute)

// ROTAS - pedido
const pedidoRoute = require("./routes/PedidoRoutes")
app.use(pedidoRoute)

const TokenRoute = require("./routes/TokenRoute")
app.use(TokenRoute)

const carregarModels = require("./models/index")
carregarModels()

app.use("/uploads", express.static("uploads"))

app.listen(3000, () => {
    console.log('Api Rodando')
})