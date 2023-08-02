const bancoDeDados = require('../bancodedados');
const { contas } = bancoDeDados;

function Saldo(req, res) {
    try {
        const { numero_conta, senha } = req.query;
        if (!numero_conta || !senha) {
            return res.status(400).json({ error: 'Informe o numero da conta e a senha' })
        }
        const contaExiste = contas.find(conta => Number(conta.numero) === Number(numero_conta));

        if (!contaExiste) {
            return res.status(400).json({ error: 'Conta Inexistente' })
        }
        if (contaExiste.usuario.senha !== senha) {
            return res.status(400).json({ error: 'A senha informada esta incorreta' })
        }
        return res.status(200).json({ saldo: contaExiste.saldo });
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { Saldo };