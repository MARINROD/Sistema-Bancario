const express = require('express');
const rotas = express();
const { ListarContasBancarias } = require('./controladores/ListarContasBancarias')
const { CriarContaBancaria } = require('./controladores/CriarContaBancaria')
const { AtualizarConta } = require('./controladores/AtualizarConta')
const { ExcluirConta } = require('./controladores/ExcluirConta')
const { Deposito } = require('./controladores/Deposito')
const { Sacar } = require('./controladores/Sacar');
const { Transferir } = require('./controladores/Transferir');
const { Extrato } = require('./controladores/Extrato');
const { Saldo } = require('./controladores/Saldo');


rotas.get('/contas', ListarContasBancarias);
rotas.post('/contas', CriarContaBancaria);
rotas.put('/contas/:numeroConta/usuario', AtualizarConta);
rotas.delete('/contas/:numeroConta', ExcluirConta);
rotas.post('/transacoes/depositar', Deposito);
rotas.post('/transacoes/sacar', Sacar);
rotas.post('/transacoes/transferir', Transferir);
rotas.get('/contas/extrato', Extrato);
rotas.get('/contas/saldo', Saldo);
module.exports = rotas