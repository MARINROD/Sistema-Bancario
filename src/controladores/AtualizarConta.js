const bancoDeDados = require('../bancodedados');

const { contas } = bancoDeDados;

function AtualizarConta(req, res) {
    try {
        const numeroDaConta = req.params.numeroConta;
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        if (!req.body) {
            return res.status(400).json({ error: 'Nenhum campo foi informado' })
        }
        const contaExiste = contas.find(conta => Number(conta.numero) === Number(numeroDaConta));
        if (!contaExiste) {
            return res.status(400).json({ error: 'Conta nao encontrada' })
        }
        const contaComCPF = contas.find(conta => conta.usuario.cpf === cpf && Number(conta.numero) !== Number(numeroDaConta));

        if (contaComCPF) {
            return res.status(400).json({ error: 'Esse CPF ja esta cadastrado em outra conta' })
        }
        const contaComEmail = contas.find(conta => conta.usuario.email === email && Number(conta.numero) !== Number(numeroDaConta));
        if (contaComEmail) {
            return res.status(400).json({ error: 'Esse Email ja esta cadastrado em outra conta' })
        }
        const atualizandoConta = {
            numero: contaExiste.numero,
            saldo: contaExiste.saldo,
            usuario: {
                ...contaExiste.usuario,
                nome: nome ?? contaExiste.usuario.nome,
                cpf: cpf ?? contaExiste.usuario.cpf,
                data_nascimento: data_nascimento ?? contaExiste.usuario.data_nascimento,
                telefone: telefone ?? contaExiste.usuario.telefone,
                email: email ?? contaExiste.usuario.email,
                senha: senha ?? contaExiste.usuario.senha,
            }
        }
        const indiceDaConta = contas.findIndex(conta => conta.numero === numeroDaConta);
        contas[indiceDaConta] = atualizandoConta;

        return res.status(200).json({ menssagem: 'Conta atualizada com Sucesso' })
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = { AtualizarConta };