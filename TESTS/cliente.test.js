const request = require('supertest');
const app = require('../app'); 

describe('API de Cadastro de Clientes', () => { 
    let clienteId;

    test('POST /v1/cadastro-clientes/cliente → deve criar um cliente', async () => {
        const response = await request(app)
            .post('/v1/cadastro-clientes/cliente')
            .send({ 
                nome: "Cliente de Teste",
                cidade: "Cidade Teste", 
                email: "teste@exemplo.com",
                telefone: "123456789" 
            });

        console.log('POST Response:', response.status, response.body);

        expect(response.statusCode).toBe(201);
        clienteId = response.body.id; 
        expect(clienteId).toBeDefined();
        expect(response.body).toHaveProperty('message', 'Item criado com sucesso');
    });

    test('GET /v1/cadastro-clientes/cliente → deve listar clientes', async () => {
        const response = await request(app).get('/v1/cadastro-clientes/cliente');
        
        console.log('GET Response:', response.status, response.body);
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.clientes)).toBe(true);
        expect(response.body.clientes.length).toBeGreaterThan(0);
    });

    test('GET /v1/cadastro-clientes/cliente/:id → deve buscar cliente por ID', async () => {
        const response = await request(app).get(`/v1/cadastro-clientes/cliente/${clienteId}`);
        
        console.log('GET by ID Response:', response.status, response.body);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.cliente).toHaveProperty('id', clienteId);
    });

    test('PUT /v1/cadastro-clientes/cliente/:id → deve atualizar cliente', async () => {
        const response = await request(app)
            .put(`/v1/cadastro-clientes/cliente/${clienteId}`)
            .send({ 
                nome: "Nome Atualizado",
                cidade: "Cidade Atualizada", // Adicionando mais campos para o PUT
                email: "atualizado@exemplo.com",
                telefone: "987654321"
            });

        console.log('PUT Response:', response.status, response.body);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Item atualizado com sucesso');
    });

    test('DELETE /v1/cadastro-clientes/cliente/:id → deve excluir cliente', async () => {
        const response = await request(app).delete(`/v1/cadastro-clientes/cliente/${clienteId}`);
        
        console.log('DELETE Response:', response.status, response.body);
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Item removido com sucesso');
    });
});