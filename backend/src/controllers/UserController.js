const User = require('../models/User');


module.exports = {
    async store (req, res) {
        const email = req.body.email;
        const nome = req.body.nome

        const user = await User.create({ email, nome });

        return res.json(user);
    }
}