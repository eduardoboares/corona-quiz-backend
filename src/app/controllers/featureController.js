const express = require('express');
const authMiddleware = require('../middlewares/auth');
const GeoCollection = require('../models/geoCollection');
const Feature = require('../models/feature');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const features = await Feature.find().populate(['user', 'geoCollection' ]);

        return res.send({ code: 0, sucess: true, message: 'Todos os polígonos listados com sucesso.', features });
    } catch (err){
        console.log(err);
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao carregar a lista de todos os polígonos.'});
    }
});

router.get('/:featureId', async (req, res) => {
    try{
        const feature = await Feature.findById(req.params.featureId).populate(['user', 'geoCollection']);

        return res.send({ code: 0, sucess: true, message: 'Polígono encontrado com sucesso.', feature });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao encontrar polígono.'});
    }
});

router.post('/:geoCollectionId', async (req, res) => {
    try{
        const { features } = req.body;

        const geoCollection = await GeoCollection.findById(req.params.geoCollectionId).populate(['user', 'features']);
       
        await Promise.all(features.map(async feature =>{
            const geoCollectionFeature = new Feature({ ...feature, geoCollection: geoCollection._id });

            await geoCollectionFeature.save();

            geoCollection.features.push(geoCollectionFeature);
        }));

        await geoCollection.save();

        return res.send({ code: 0, sucess: true, message: 'Novo polígono criado com sucesso.', geoCollection });

    } catch (err) {
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao criar um novo polígono, tente novamente.' });
    }
});

router.put('/:featureId', async (req, res) => {
    try{
        const { title, description, type, geometry, properties  } = req.body;

        const feature = await Feature.findOneAndUpdate(req.params.featureId, { 
           title,
           description,
           type,
           geometry,
           properties
        }, { new: true });

        await feature.save();

        return res.send({ code : 0,  success : true, message: 'Polígono atualizado com sucesso.', geoCollection });

    } catch (err) {
      console.log(err)
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao atualizar polígono, tente novamente.' });
    }
});

router.delete('/:featureId', async (req, res) => {
    try{
        await Feature.findOneAndDelete(req.params.featureId).populate('user');

        return res.send({ code : 0,  success : true, message: 'Polígono deletado com sucesso.' });
    } catch (err){
        return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao deletar polígono.'});
    }
});

module.exports = app => app.use('/features', router);