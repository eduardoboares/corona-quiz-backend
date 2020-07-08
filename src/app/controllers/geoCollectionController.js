const express = require('express');
const authMiddleware = require('../middlewares/auth');
const GeoCollection = require('../models/geoCollection');
const Feature = require('../models/feature');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const geoCollections = await GeoCollection.find().populate(['user', 'features' ]);

        return res.send({ code: 0, sucess: true, message: 'Todas as coleções de polígonos listadas com sucesso', geoCollections });
    } catch (err){
        console.log(err);
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao carregar a lista de todas as coleções de polígonos.'});
    }
});

router.get('/:geoCollectionId', async (req, res) => {
    try{
        const geoCollection = await GeoCollection.findById(req.params.geoCollectionId).populate(['user', 'features']);

        return res.send({ code: 0, sucess: true, message: 'Coleção de polígonos encontrada com sucesso.', geoCollection });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao encontrar coleção de polígonos.'});
    }
});

router.post('/', async (req, res) => {
    try{
        const {  title, description, type, features } = req.body;

        const geoCollection = await GeoCollection.create({ title, description, type, user: req.userId });
       
        await Promise.all(features.map(async feature =>{
            const geoCollectionFeature = new Feature({ ...feature, geoCollection: geoCollection._id });

            await geoCollectionFeature.save();

            geoCollection.features.push(geoCollectionFeature);
        }));

        await geoCollection.save();

        return res.send({ code: 0, sucess: true, message: 'Nova coleção de polígonos criada com sucesso.', geoCollection });

    } catch (err) {
        console.log(err);
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao criar nova coleção de polígonos.' });
    }
});

router.put('/:geoCollectionId', async (req, res) => {
    try{
        const { title, description, type, features } = req.body;

        const geoCollection = await GeoCollection.findOneAndUpdate(req.params.geoCollectionId, { 
            title, 
            description, 
            type,
        }, { new: true });

        geoCollection.features = [];
        await Feature.remove({ geoCollection: geoCollection._id });

        await Promise.all(features.map(async feature =>{
            const geoCollectionFeature = new Feature({ ...feature, geoCollection: geoCollection._id });

            await geoCollectionFeature.save();

            geoCollection.features.push(geoCollectionFeature);
        }));

        await geoCollection.save();

        return res.send({ code : 0,  success : true, message: 'Coleção de polígonos atualizada com sucesso.', geoCollection });

    } catch (err) {
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao atualizar coleção de polígonos.' });
    }
});

router.delete('/:geoCollectionId', async (req, res) => {
    try{
        await Feature.findOneAndDelete(req.params.geoCollectionId).populate('user');
        await GeoCollection.findOneAndDelete(req.params.geoCollectionId).populate('user');

        return res.send({ code : 0,  success : true, message: 'Coleção de polígonos deletada com sucesso.' });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao deletar coleção de polígonos.'});
    }
});

module.exports = app => app.use('/geoCollections', router);