'use strict'
const repository = require('../repositories/produto-repository');
const ctrlBase = require('../bin/base/controller-base')
const validation = require('../bin/helpers/validation');

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function produtoController() {}

produtoController.prototype.post = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.nome, 'Informe o nome do produto');
    validationContract.isRequired(req.body.descricao, 'Informe a descrição do produto');
    validationContract.isRequired(req.body.preco, 'Informe o preço do produto');
    validationContract.isRequired(req.body.foto, 'Informe a foto produto');

    if(req.body.preco) {
        validationContract.isTrue(req.body.preco == 0, 'O preço do produto não pode ser zero.')
    }

    ctrlBase.post(repository, validationContract, req, res);
};

produtoController.prototype.put = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.nome, 'Informe o nome do produto');
    validationContract.isRequired(req.body.descricao, 'Informe a descrição do produto');
    validationContract.isRequired(req.body.preco, 'Informe o preço do produto');
    validationContract.isRequired(req.body.foto, 'Informe a foto produto');

    if(req.body.preco) {
        validationContract.isTrue(req.body.preco == 0, 'O preço do produto não pode ser zero.')
    }

    ctrlBase.put(repository, validationContract, req, res);
};

produtoController.prototype.get = async (req, res) => {
    ctrlBase.get(repository, req, res);
};

produtoController.prototype.getById = async (req, res) => {
    ctrlBase.getById(repository, req, res);
};

produtoController.prototype.delete = async (req, res) => {
    ctrlBase.delete(repository, req, res);
};

module.exports = produtoController;