const bancoDeDados = require('../bancodedados');

const { contas } = bancoDeDados;

function ExcluirConta(req, res) {
    try {
        const numeroDaConta = req.params.numeroConta;
        const indiceConta = contas.findIndex(conta => conta.numero === numeroDaConta);
        if (indiceConta === -1) {
            return res.status(404).json({ error: 'A conta nao existe' })
        }
        if (contas[indiceConta].saldo > 0) {
            return res.status(400).json({ error: 'A conta nao pode ser excluida pois ainda tem saldo' })
        }
        contas.splice(indiceConta, 1);
        return res.status(200).json({ menssagem: 'Conta excluida com sucesso' })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { ExcluirConta };