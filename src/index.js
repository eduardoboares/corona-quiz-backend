const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config({  
	path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env"
})

const cors = require('cors');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, GET, OPTIONS");
  }

  res.header('Accept', 'application/json');
  res.header('content-type', 'application/json');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers')(app);

app.get('/', function (req, res) {
  res.send('API-REST do aplicativo Corona Quiz está no ar!');
});

app.listen(process.env.PORT || 3000);