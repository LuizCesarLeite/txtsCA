// https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const User = require('../models/User');

module.exports = {
    async store (req, res) {
        /** 
        const nome = req.body.nome
        const ra = req.body.ra
        const telefone = req.body.telefone
        const email = req.body.email
        const senha = req.body.senha

        const user = await User.create({ email, nome, ra, telefone, senha });

        return res.json(user);
        */

        await User.findOne({ email: req.body.email }, function (user) {

            user = new User({ 
                nome: req.body.nome, 
                ra: req.body.ra,
                email: req.body.email, 
                telefone: req.body.telefone,
                senha: req.body.senha,
                foto: ''
            });

            user.save(function (err) {
                if (err) { return res.status(500).send({
                        msg: err.message 
                    }); 
                }

                // Cria um token de verificação para o user
                var token = new Token({ 
                    _userId: user._id, 
                    token: crypto.randomBytes(16).toString('hex') 
                });

                // Salva o token de verificação
                token.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }

                    // Manda email
                    var transporter = nodemailer.createTransport({ 
                        service: 'Sendgrid', auth: { user: process.env.MAIL_NOME, pass: process.env.MAIL_SENHA } 
                    });
                    
                    var mailOptions = { 
                        from: 'no-reply@yourwebapplication.com', 
                        to: user.email, 
                        subject: 'Verificação de do seu email no txtCAs', 
                        text: 'Olá,\n\n' + 'Por favor, habilite sua conta no txtsCA clicando nesse link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' 
                    };

                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                            return res.status(500).send({ msg: err.message }); 
                        }
                        res.status(200).send(
                            'Um email de verificação foi mandado para ' + user.email + ', confere lá.'
                        );
                    });
                });
            });
        
            return res.json(user);
        });
        
    }
}