const axios = require('axios');
const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
try{
  const { bbox, page, limit, cloud } = req.query;

  console.log('bbox: ', bbox)
  console.log('page: ', page)
  console.log('limit: ', limit)
  console.log('cloud: ', cloud)

  let apiResponse = await axios.get(`https://sat-api.developmentseed.org/stac/search?bbox=${bbox}`);

  apiResponse = apiResponse.data

  return res.send({ code: 0, sucess: true, message: 'Dados da STAC API pesquisados com sucesso.', apiResponse });
} catch (err){
  console.log(err);
  return res.status(400).send({ code: 400, sucess: false, message: 'Erro ao pesquisar dados da STAC API.'});
}
});   

module.exports = app => app.use('/stac', router);