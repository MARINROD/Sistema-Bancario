const bancoDeDados = require('../bancodedados');
const { format } = require('date-fns')
const { contas, depositos } = bancoDeDados;

function Deposito(req, res) {
    try {
        const { numero, valor } = req.body;
        if (!numero || !valor) {
            return res.status(400).json({ error: 'Numero da conta e valor sao obrigatorios para prosseguir com o deposito' })
        }

        const contaExiste = contas.find(conta => Number(conta.numero) === numero);

        if (!contaExiste) {
            return res.status(400).json({ error: 'conta inexistente' })
        }
        if (valor <= 0) {
            return res.status(400).json({ error: 'o valor a ser depositado nao pode ser menor ou igual a 0' })
        }
        contaExiste.saldo = contaExiste.saldo + valor;

        const dataAtual = new Date();
        const dataFormatada = format(dataAtual, 'yyyy-MM-dd HH:mm:ss');

        const registroDeposito = {
            data: dataFormatada,
            numeroDaConta: numero,
            valor: valor,
        };
        depositos.push(registroDeposito);
        return res.status(200).json({ menssagem: 'Deposito realizado com sucesso' })

    } catch (error) {
        return res.status(500).json(error.message)
    }


}

module.exports = { Deposito };