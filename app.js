/*************************************************************************************************
 * OBJETIVO: API referente ao projeto de cadastro de clientes
 * DATA: 21/08/2025
 * AUTOR: DANIEL TORRES
 * VERSÃO: 1.0
 *************************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import do controller de clientes
const controllerCliente = require('./controller/cliente/controllerCliente.js')

const bodyParserJson = bodyParser.json()

const app = express()

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())
    next()
})

// POST - Inserir novo cliente
app.post('/v1/cadastro-clientes/cliente', cors(), bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultCliente = await controllerCliente.inserirCliente(dadosBody, contentType)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// GET - Listar todos os clientes
app.get('/v1/cadastro-clientes/cliente', cors(), async (request, response) => {
    let resultCliente = await controllerCliente.listarClientes()
    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// GET - Buscar cliente por ID
app.get('/v1/cadastro-clientes/cliente/:id', cors(), async (request, response) => {
    let idCliente = request.params.id
    let resultCliente = await controllerCliente.buscarCliente(idCliente)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// PUT - Atualizar cliente por ID
app.put('/v1/cadastro-clientes/cliente/:id', cors(), bodyParserJson, async (request, response) => {
    let contentType = request.headers['content-type']
    let idCliente = request.params.id
    let dadosBody = request.body

    let resultCliente = await controllerCliente.atualizarCliente(dadosBody, idCliente, contentType)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

// DELETE - Excluir cliente por ID
app.delete('/v1/cadastro-clientes/cliente/:id', cors(), async (request, response) => {
    let idCliente = request.params.id
    let resultCliente = await controllerCliente.excluirCliente(idCliente)

    response.status(resultCliente.status_code)
    response.json(resultCliente)
})

app.listen(8080, function () {
    console.log('API de cadastro de clientes rodando na porta 8080...')
})
