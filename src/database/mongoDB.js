const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL
mongoose.connect(DB_URL, {
    dbName: "restaurante_db",
}).then(() => {
    console.log("Banco conectado com sucesso")
}).catch(error => {
    console.log("Erro ao se conectar com o banco" + error);
})