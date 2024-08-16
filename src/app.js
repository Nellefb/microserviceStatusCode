//para inicializaão do servidor
const express = require('express')
const app = express()
//express.json: configurar para receber json nos request
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//para incluir rota
const index = require('./routes/index')
app.use('/', index)

//p exportar app
module.exports = app;