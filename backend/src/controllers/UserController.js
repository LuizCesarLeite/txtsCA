const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Token = require('../models/Token');
const User = require('../models/User');

module.exports = {
    async store (req,res) {
        const email = req.body.email;
        
        let user = await User.findOne ({ email: email });
      
        if (user) {
            console.log('Esse email já era, use outro.')
        };
      
        if (!user) {
            user = new User({ 
                nome: req.body.nome,
                ra: '',
                email: req.body.email, 
                telefone: req.body.telefone,
                senha: req.body.senha,
                foto: ''
            });

            user.save(function (err) {
                if (err) { 
                    return res.status(500).send({
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
                    if (err) { 
                        return res.status(500).send({ 
                            msg: err.message 
                        }); 
                    }

                    // Manda email
                    var transporter = nodemailer.createTransport({ 
                        service: 'Sendgrid', 
                        auth: { 
                            user: process.env.MAIL_NOME, 
                            pass: process.env.MAIL_SENHA 
                        } 
                    });
                    
                    var mailOptions = { 
                        from: 'no-reply@yourwebapplication.com', 
                        to: user.email, 
                        subject: 'Verificação de seu email no txtCAs', 
                        // text: 'Olá,\n\n' + 'Por favor, habilite sua conta no txtCAs clicando nesse link: \nhttp:\/\/' + req.headers.host + '\/confirma\/' + token.token + '.\n' 
                        text: 'Olá,\n\n' + 'Por favor, habilite sua conta no txtCAs copiando e colando este codigo [ ' + token.token + ' ].' 
                    };

                    transporter.sendMail(mailOptions, function (err) {
                        if (err) { 
                            return res.status(500).send({ msg: err.message }); 
                        }
                        res.status(200).send(
                            'Um email de verificação foi mandado para ' + user.email + ', confere lá.'
                        );
                    });
                }); //token.save
            }); //user.save
              
            return res.json(user);
        } //if (!user)
    },

    async confirmationPost (req, res) {
        // Localiza o token
        const token_ = req.body.token;
        const userAchado = null;
        await Token.findOne({ token:token_ }, function (err, tokenData) {
            if(err){
                res.status(500).send;
            }

            if (!tokenData) {
                console.log("req.body.token:[" + token_ +"]");
                const msgErr = 'Não achamos seu token de verificação ['+ token_ +'], talvez ele tenha expirado.';
                console.log(msgErr);  
                return res.status(404).send(msgErr);
            }
            else 
            {     
                // Depois de achar o token, acha o usuário
                User.findOne({ _id: tokenData._userId }, function (err, user) {

                    if (!user) {
                        console.log('Não achamos o usuário desse token.');
                        return res.status(400).send(body);
                    }

                    userAchado = user;
                    if (user.isVerified) {
                        console.log('Esse usuário já foi verificado.')
                        return res.status(400).send({ 
                            type: 'already-verified', 
                            msg: 'Esse usuário já foi verificado.' 
                        });
                    }
                });
        
                // Verifica e salva o caboclo
                userAchado.isVerified = true;
                userAchado.save(function (err) {
                    if (err) { 
                        return res.status(500).send({ 
                            msg: err.message 
                        }); 
                    }
                    const msgOk = 'Conta verificada!. Agora é só logar.';
                    console.log(msgOk);
                    res.status(200).send(msgOk);
                });
            } //else if (!tokenData)
        }); //await Token.findOne
    } //async confirmationPost
}
