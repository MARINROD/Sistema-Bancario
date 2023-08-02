const bancoDeDados = require('../bancodedados');
const { format } = require('date-fns')
const { contas, saques } = bancoDeDados;


function Sacar(req, res) {
    try {
        const { valor, senha, numero } = req.body;

        if (!valor || !senha || !numero) {
            return res.status(400).json({ error: 'O numero da conta, valor e senha devem ser informados para fazer o saque' })
        }
        const contaExiste = contas.find(conta => Number(conta.numero) === numero);

        if (!contaExiste) {
            return res.status(400).json({ error: 'conta inexistente' })
        }
        if (senha !== contaExiste.usuario.senha) {
            return res.status(400).json({ error: 'A senha informada esta incorreta' })
        }
        if (contaExiste.saldo - valor < 0) {
            return res.status(400).json({ error: 'Saldo insuficiente' })
        }
        const dataAtual = new Date();
        const dataFormatada = format(dataAtual, 'yyyy-MM-dd HH:mm:ss');

        contaExiste.saldo = contaExiste.saldo - valor;
        const registroSaque = {
            data: dataFormatada,
            numeroDaConta: numero,
            valor: valor,
        };
        saques.push(registroSaque);
        return res.status(200).json({ menssagem: 'Saque realizado com sucesso' })
    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = { Sacar };