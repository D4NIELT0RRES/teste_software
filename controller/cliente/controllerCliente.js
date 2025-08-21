/***************************************************************************************
 * OBJETIVO: Controller responsável pela regra de negócio do CRUD do CLIENTE.
 * DATA: 21/08/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//Import do arquivo de configuração para a mensagem e status code
const MESSAGE = require('../../modulo/config.js')

//Import do DAO para realizar um CRUD no banco de dados
const clienteDAO = require('../../model/DAO/cliente.js')

//Função para inserir um novo cliente
const inserirCliente = async function(cliente, contentType) {

    try {
        if (contentType == 'application/json') {

            if (cliente.nome     == undefined || cliente.nome     == '' || cliente.nome     == null || cliente.nome.length    > 100 ||
                cliente.cidade   == undefined || cliente.cidade   == '' || cliente.cidade   == null || cliente.cidade.length  > 100 ||
                cliente.email    == undefined || cliente.email    == '' || cliente.email    == null || cliente.email.length   > 150 ||
                cliente.telefone == undefined || cliente.telefone == '' || cliente.telefone == null || cliente.telefone.length > 20
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            } else {
                let resultCliente = await clienteDAO.insertCliente(cliente)

                if (resultCliente) {
                    return MESSAGE.SUCCESS_CREATED_ITEM
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para atualizar um cliente
const atualizarCliente = async function(cliente, id, contentType) {

    try {
        if (contentType == 'application/json') {

            if (cliente.nome     == undefined || cliente.nome     == '' || cliente.nome     == null || cliente.nome.length    > 100 ||
                cliente.cidade   == undefined || cliente.cidade   == '' || cliente.cidade   == null || cliente.cidade.length  > 100 ||
                cliente.email    == undefined || cliente.email    == '' || cliente.email    == null || cliente.email.length   > 150 ||
                cliente.telefone == undefined || cliente.telefone == '' || cliente.telefone == null || cliente.telefone.length > 20 ||
                id == undefined || id == '' || id == null || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS //400
            } else {
                //Validar se o ID existe no BD
                let resultCliente = await clienteDAO.selectByIdCliente(parseInt(id))

                if (resultCliente != false || typeof (resultCliente) == 'object') {
                    if (resultCliente.length > 0) {

                        cliente.id = parseInt(id)

                        let result = await clienteDAO.updateCliente(cliente)

                        if (result) {
                            return MESSAGE.SUCCESS_UPDATE_ITEM //200
                        } else {
                            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                        }
                    } else {
                        return MESSAGE.ERROR_NOT_FOUND //404
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
                }
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para excluir um cliente 
const excluirCliente = async function(id) {

    try {
        if (id == "" || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        } else {
            let resultCliente = await buscarCliente(parseInt(id))

            if (resultCliente.status_code == 200) {
                let result = await clienteDAO.deleteCliente(parseInt(id))

                if (result) {
                    return MESSAGE.SUCCESS_DELETE_ITEM //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else if (resultCliente.status_code == 404) {
                return MESSAGE.ERROR_NOT_FOUND //404
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar todos os clientes
const listarClientes = async function() {

    try {
        const dadosClientes = {}

        let resultCliente = await clienteDAO.selectAllClientes()

        if (resultCliente != false || typeof (resultCliente) == 'object') {
            if (resultCliente.length > 0) {

                dadosClientes.status = true
                dadosClientes.status_code = 200
                dadosClientes.items = resultCliente.length
                dadosClientes.clientes = resultCliente

                return dadosClientes //200

            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para buscar um cliente pelo ID
const buscarCliente = async function(id) {

    try {
        let idCliente = id

        if (id == "" || id == undefined || id == null || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        } else {

            let dadosClientes = {}

            let resultCliente = await clienteDAO.selectByIdCliente(parseInt(idCliente))
            if (resultCliente != false || typeof (resultCliente) == 'object') {
                if (resultCliente.length > 0) {

                    dadosClientes.status = true
                    dadosClientes.status_code = 200
                    dadosClientes.clientes = resultCliente

                    return dadosClientes //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirCliente,
    atualizarCliente,
    excluirCliente,
    listarClientes,
    buscarCliente
}
