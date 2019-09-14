'use strict';
const repository = require('../repositories/categoria-repository');
const ctrlBase = require('../bin/base/controller-base')
const validation = require('../bin/helpers/validation');

const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function categoriaController() {}

categoriaController.prototype.post = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.titulo, 'Informe o título da categoria');
    validationContract.isRequired(req.body.foto, 'Informe a foto da categoria');

    ctrlBase.post(repository, validationContract, req, res);
};

categoriaController.prototype.put = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.titulo, 'Informe o título da categoria');
    validationContract.isRequired(req.body.foto, 'Informe a foto da categoria');
    validationContract.isRequired(req.params.id, 'Informe o id da categoria');

    ctrlBase.put(repository, validationContract, req, res);
};

categoriaController.prototype.get = async (req, res) => {
    ctrlBase.get(repository, req, res);
};

categoriaController.prototype.getById = async (req, res) => {
    ctrlBase.getById(repository, req, res);
};

categoriaController.prototype.delete = async (req, res) => {
    ctrlBase.delete(repository, req, res);
};

module.exports = categoriaController;