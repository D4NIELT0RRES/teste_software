/***************************************************************************************
 * OBJETIVO: Model responsável pelo CRUD de dados referente a CLIENTES no BANCO DE DADOS.
 * DATA: 21/08/2025
 * AUTOR: Daniel Torres
 * Versão: 1.0
 ***************************************************************************************/

//TRY-CATCH - usado para não derrubar a API depois de subir ela, e usando o console.log ela guia o lugar do erro (Sempre usar Try-Catch)

//quando for script que não retorna dados (insert, update e delete) -> executeRawUnsafe
//quando for script que tem algum retorno (return) - queryRawUnsafe

//Import da biblioteca do prisma client para executar scripts no BD
const { PrismaClient } = require('@prisma/client')

//Instancia da classe do prisma client, para gerar um objeto
const prisma = new PrismaClient()

//Função para inserir no Banco de Dados um novo cliente
const insertCliente = async function(cliente) {
    try {
        let sql = `insert into clientes(
                        nome,
                        cidade,
                        email,
                        telefone
                    ) values (
                        '${cliente.nome}',
                        '${cliente.cidade}',
                        '${cliente.email}',
                        '${cliente.telefone}'
                    );`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            let sqlSelect = `SELECT * FROM clientes WHERE email = '${cliente.email}' ORDER BY id DESC LIMIT 1`
            let criado = await prisma.$queryRawUnsafe(sqlSelect)
            return criado[0]
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para atualizar no Banco de Dados um cliente existente
const updateCliente = async function(cliente) {
    try {
        let sql = `update clientes set  
                        nome    = '${cliente.nome}',
                        cidade  = '${cliente.cidade}',
                        email   = '${cliente.email}',
                        telefone= '${cliente.telefone}'
                    where id = ${cliente.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para excluir no Banco de Dados um cliente existente
const deleteCliente = async function(id) {
    try {
        let sql = `delete from clientes where id=${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para retornar todos os clientes
const selectAllClientes = async function() {
    try {
        let sql = `select * from clientes`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

//Função para buscar um cliente pelo ID
const selectByIdCliente = async function(id) {
    try {
        let sql = `select * from clientes where id=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    insertCliente,
    updateCliente,
    deleteCliente,
    selectAllClientes,
    selectByIdCliente
}
