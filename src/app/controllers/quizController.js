const express = require('express');
const authMiddleware = require('../middlewares/auth');
const Quiz = require('../models/quiz');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const quiz = await Quiz.find();

        return res.send({ code: 0, sucess: true, message: 'Todos os quiz listados com sucesso', quiz });
    } catch (err){
        console.log(err);
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao carregar a lista de todos os quiz.'});
    }
});

router.get('/:quizId', async (req, res) => {
    try{
        const quiz = await Quiz.findById(req.params.quizId);
        
        if (await quiz.lenght == 0) {
            return res.status(400).send({ code: 400, sucess: false, message: 'Nenhum quiz encontrado.'}); 
        }

        return res.send({ code: 0, sucess: true, message: 'Quiz encontrado com sucesso.', quiz });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao encontrar quiz.'});
    }
});

router.post('/', async (req, res) => {
    try{
        const {  title, description, questions, references } = req.body;

        const quiz = await Quiz.create({ title, description, questions, references });

        await quiz.save();

        return res.send({ code: 0, sucess: true, message: 'Novo quiz criado com sucesso.', quiz });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao criar novo quiz.' });
    }
});

router.put('/:quizId', async (req, res) => {
    try{
        const { title, description, questions, references } = req.body;

        const quiz = await Quiz.findOneAndUpdate(req.params.quizId, { 
            title, 
            description, 
            questions,
            references
        }, { new: true });

        await quiz.save();

        return res.send({ code : 0,  success : true, message: 'Quiz atualizado com sucesso.', quiz });

    } catch (err) {
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao atualizar quiz.' });
    }
});

router.delete('/:quizId', async (req, res) => {
    try{
        await Quiz.findOneAndDelete(req.params.quizId);

        return res.send({ code : 0,  success : true, message: 'Quiz deletado com sucesso.' });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao deletar quiz.'});
    }
});

module.exports = app => app.use('/quiz', router);