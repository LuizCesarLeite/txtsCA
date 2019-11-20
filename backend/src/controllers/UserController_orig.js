// https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const User = require('../models/User');

module.exports = {
    async store (req, res) {
        // Não funfa a descoberta de email anteriores
        await User.findOne({ email: req.body.email }, function (user) {

            if (user) return res.status(400).send({ msg: 'Esse email já era, use outro.' });

            user = new User({ 
                nome: req.body.nome, 
                ra: '',
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
                        subject: 'Verificação de seu email no txtCAs', 
                        // text: 'Olá,\n\n' + 'Por favor, habilite sua conta no txtCAs clicando nesse link: \nhttp:\/\/' + req.headers.host + '\/confirma\/' + token.token + '.\n' 
                        text: 'Olá,\n\n' + 'Por favor, habilite sua conta no txtCAs clicando nesse link: \nhttp://localhost:3000/confirma\/' + token.token + '.\n' 
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
    },

    async confirmationPost (req, res) {
        // Localiza o token
        await Token.findOne({ token: req.body.token }, function (token) {
            if (!token) return res.status(400).send({ 
                type: 'not-verified', msg: 'Não achamaos seu número de verificação, talvez ele tenha expirado.' 
            });
     
            // Depois de achar o token, acha o usuário
            User.findOne({ _id: token._userId, email: req.body.email }, function (err, user) {

                if (!user) return res.status(400).send({ 
                    msg: 'Não achamos o usuário desse token.' 
                });
                if (user.isVerified) return res.status(400).send({ 
                    type: 'already-verified', msg: 'Esse usuário já foi verificado.' 
                });
     
                // Verifica e salva o caboclo
                user.isVerified = true;
                user.save(function (err) {
                    if (err) { return res.status(500).send({ msg: err.message }); }
                    res.status(200).send("Conta verificada!. Agora é só logar.");
                });
            });
        })
    }
}
