-- Criando o banco de dados
CREATE DATABASE db_cadastro_cliente;

-- Usando o banco
USE db_cadastro_cliente;

-- Criando a tabela de usuários
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único para cada usuário
    nome VARCHAR(100) NOT NULL,         -- Nome do usuário
    cidade VARCHAR(100) NOT NULL,       -- Cidade do usuário
    email VARCHAR(150) NOT NULL UNIQUE, -- Email (não pode repetir)
    telefone VARCHAR(20) NOT NULL       -- Telefone
);

select * from clientes;

show tables;


drop database db_cadastro_usuarios;