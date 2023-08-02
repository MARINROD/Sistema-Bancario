const bancoDeDados = require('../bancodedados');
const { banco, contas, saques, depositos, transferencias } = bancoDeDados;

function Extrato(req, res) {
    try {
        const { numero_conta, senha } = req.query;
        if (!numero_conta || !senha) {
            return res.status(400).json({ error: 'Informe o numero da conta e a senha' })
        }
        const contaExiste = contas.find(conta => banco.numero === numero_conta);

        if (!contaExiste) {
            return res.status(400).json({ error: 'Conta Inexistente' })
        }
        if (banco.senha !== senha) {
            return res.status(400).json({ error: 'A senha informada esta incorreta' })
        }
        const extrato = {
            transferencias: [...transferencias],
            depositos: [...depositos],
            saques: [...saques]
        }
        return res.status(200).json(extrato);


    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = { Extrato };