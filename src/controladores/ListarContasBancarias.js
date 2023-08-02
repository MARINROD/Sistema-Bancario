const bancoDeDados = require('../bancodedados');

const { banco, contas } = bancoDeDados
function ListarContasBancarias(req, res) {
    try {
        const senha = req.query.senha_banco;

        if (senha !== banco.senha || !senha) {
            return res.status(404).json({ error: 'Senha incorreta' });
        }
        return res.status(200).json(contas);
    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = { ListarContasBancarias };

