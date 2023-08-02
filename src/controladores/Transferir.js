const bancoDeDados = require('../bancodedados');
const { format } = require('date-fns');
const { contas, transferencias } = bancoDeDados;

function Transferir(req, res) {
    try {
        const { numero, valor, senha, numeroDestino } = req.body
        if (!numero || !valor || !senha || !numeroDestino) {
            return res.status(400).json({ menssagem: 'Informe o numero da conta de orgiem, o valor, a senha e a conta de destino' })
        }
        const contaDeOrigem = contas.find(conta => Number(conta.numero) === numero);
        const contaDestino = contas.find(conta => Number(conta.numero) === numeroDestino);
        if (!contaDeOrigem) {
            return res.status(400).json({ error: 'A conta de origem nao existe' })
        }
        if (!contaDestino) {
            return res.status(400).json({ error: 'A conta de destino nao existe' })
        }
        if (senha !== contaDeOrigem.usuario.senha) {
            return res.status(400).json({ error: 'A senha informada esta incorreta' })
        }
        if (contaDeOrigem.saldo - valor < 0) {
            return res.status(400).json({ error: 'Saldo insuficiente' })
        }

        const dataAtual = new Date();
        const dataFormatada = format(dataAtual, 'yyyy-MM-dd HH:mm:ss');

        contaDeOrigem.saldo = contaDeOrigem.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;
        const registroTransferencia = {
            data: dataFormatada,
            numero: numero,
            numeroDestino: numeroDestino,
            valor: valor,
        };
        transferencias.push(registroTransferencia);
        return res.status(200).json({ menssagem: 'Transferencia realizada com sucesso' });
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = { Transferir };