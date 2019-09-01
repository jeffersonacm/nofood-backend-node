const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/config/variables');

const categoriaRouter = require('../routes/categoria-router');
const produtoRouter = require('../routes/produto-router');

//invoke api express
const app = express();

//config parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//connect mongodb
console.log(variables.Database.connection);
mongoose.connect(variables.Database.connection, { useNewUrlParser: true });

//config routes
app.use('/api/categoria', categoriaRouter);
app.use('/api/produto', produtoRouter);

//export api
module.exports = app;
