const bancoDeDados = require('../bancodedados');


const { contas } = bancoDeDados

function CriarContaBancaria(req, res) {
    try {
        const { nome, cpf, data_de_nascimento, telefone, email, senha } = req.body;

        if (!nome || !cpf || !data_de_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatorios" })
        }
        let contaExistente = contas.find(conta => conta.usuario.cpf === cpf);
        if (contaExistente) {
            return res.status(400).json({ error: 'CPF ja cadastrado' })
        }
        contaExistente = contas.find(conta => conta.usuario.email === email);
        if (contaExistente) {
            return res.status(400).json({ error: 'Email ja cadastrado' })
        }

        const novaConta = {
            numero: contas.length + 1,
            saldo: 0,
            usuario: { ...req.body }
        }
        contas.push(novaConta);

        return res.status(201).json(novaConta)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { CriarContaBancaria };