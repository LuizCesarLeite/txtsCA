const User = require('../models/User');


module.exports = {
    async store (req, res) {
        const nome = req.body.nome
        const ra = req.body.ra
        const telefone = req.body.telefone
        const email = req.body.email
        const senha = req.body.senha

        const user = await User.create({ email, nome, ra, telefone, senha });

        return res.json(user);
    }
}