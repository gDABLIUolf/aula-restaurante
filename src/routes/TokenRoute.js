const express = require("express")
const tokenHelper = require("./../helpers/helper/token")
const router = express.Router()

router.get("/gerar-token", (req, res) => {
    const token = tokenHelper.gerarToken()
    return res.status(200).send({ token })
})

module.exports = router