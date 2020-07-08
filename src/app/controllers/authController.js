const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const User = require('../models/user');
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    console.log('teste', req.body);
    try {
        
        if(await User.findOne({ email }))
        return res.status(400).send({ code : 400,  success : false, message: 'E-mail de usuário já existente.' });
        
        const user = await User.create(req.body);
        
        user.password = undefined;

        return res.send({
            code : 0,  
            success : true, 
            message: 'Usuário registrado com sucesso. Seja bem vindo!', 
            user,
            token: generateToken({ id: user.id }),
         });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ code : 400,  success : false, message: 'Falha ao registrar.' });
        
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user)
    return res.status(400).send({ code : 400,  success : false, message: 'Usuário não encontrado.' });

    if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ code : 400,  success : false, message: 'Senha inválida.' });

    user.password = undefined;

    res.send({
        code : 0,  
        success : true, 
        message: 'Usuário autenticado com sucesso.',
        user,
        token: generateToken({ id: user.id }),
    }); 
});

router.post('/forgot_password', async (req, res) => {
    
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).send({ code : 400,  success : false, message: 'Usuário não encontrado.' });

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'eduardo@rocketseat.com.br',
            template:   'auth/forgot_password',
            context: { token },
        }, (err) => {
            if (err)
                return res.status(400).send({ code : 400,  success : false, message: 'Não é possível enviar o e-mail da senha esquecida.' });

            return res.send({ code : 0,  success : true, message: 'E-mail para redefinir senha enviado com sucesso.' });

        });

    } catch (err) {
        console.log(err);
        res.status(400).send({ code : 400,  success : false, message: 'Erro ao redefinir a senha, tente novamente.' });
    }
});

router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try{
        const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ code : 400,  success : false, message: 'Usuário não encontrado.' });

        if (token !== user.passwordResetToken)
            return res.status(400).send({ code : 400,  success : false, message: 'Token inválido.' });

        const now =  new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ code : 400,  success : false, message: 'Token expirado, gere um novo.' });

        user.password = password;

        await user.save();

        res.send({ code : 0,  success : true, message: 'Senha redefinida com sucesso.' });

    } catch (err) {
        res.status(400).send({ code : 400,  success : false, message: 'Não é possível redefinir a senha, tente novamente.' });
    }
});

module.exports = app => app.use('/auth', router);  