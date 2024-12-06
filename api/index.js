//instalar um módulo que oferece recursos p/ desenvolver um servidor http
//npm install express

//importar o módulo para ser utilizado em nossa aplicação
//const express = require('express'); commonJS
//vamos utilizar o padrão modular para importar os módulos
//não esqueça de atualizar o arquivo package.json adicionando a chave "type":"module"
import express from 'express';
import rotaProduto from '../Rotas/rotaProdutos.js';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaCategoria from '../Rotas/rotaCategoria.js';
import rotaCliente from '../Rotas/rotaClientes.js';
import rotafornecedor from '../Rotas/rotaFornecedores.js';
import rotaUsuario from '../Rotas/rotaUsuarios.js';

//carregar as variáveis de ambiente a partir
//do arquivo .env localizado na raiz do projeto
dotenv.config();

const host = "0.0.0.0"; //todas as placas de rede do computador que está executando a aplicação
const porta = 4000;

const app = express(); //aplicação completa HTTP
//prepara a aplicação para processar dados no formato JSON
app.use(express.json());

//configurar a aplicação para responder requisições não importando a origem
app.use(cors({
                "origin":"*",
                "Access-Control-Allow-Origin":'*'
        }));

//app utilize a pasta 'publico' para disponibilizar o conteúdo ali armazenado

app.get("/", (req, res) => {
    res.send("API funcionando corretamente!");
});


app.use("/produto",rotaProduto);
app.use("/categoria",rotaCategoria);
app.use('/cliente',rotaCliente);
app.use('/fornecedor',rotafornecedor);
app.use('/usuario', rotaUsuario);


//Funciona para servidor local não para Vercel


/*
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`)
});

*/




export default app;