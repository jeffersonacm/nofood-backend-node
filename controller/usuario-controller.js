'use strict'
const repository = require('../repositories/usuario-repository');
const validation = require('../bin/helpers/validation');
const md5 = require('md5');
const ctrlBase = require('../bin/base/controller-base')
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

const _repository = new repository();
function usuarioController() {}

usuarioController.prototype.post = async (req, res) => {
    let validationContract = new validation();

    validationContract.isRequired(req.body.nome, 'Informe seu nome');
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    validationContract.isRequired(req.body.senha, 'Informe sua senha');
    validationContract.isRequired(req.body.senhaConfirmacao, 'Informe a senha de confirmação')
    validationContract.isTrue(req.body.senha != req.body.senhaConfirmacao, 'A senha e a confirmação são diferentes');

    let usuarioEmailExiste = await _repository.isEmailExist(req.body.email);
    if (usuarioEmailExiste) {
        validationContract.isTrue(usuarioEmailExiste != undefined), `Já existe um cadastro com o email ${req.body.email}`;
    }

    req.body.senha = md5(req.body.senha);
    ctrlBase.post(_repository, validationContract, req, res);
};

usuarioController.prototype.put = async (req, res) => {
    let validationContract = new validation();

    validationContract.isRequired(req.body.nome, 'Informe seu nome');
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    validationContract.isRequired(req.params.id, 'Informe o id do usuário que será editado');

    let usuarioEmailExiste = await _repository.isEmailExist(req.body.email);
    if (usuarioEmailExiste) {
        validationContract.isTrue(
            (usuarioEmailExiste != undefined) &&
            (usuarioEmailExiste._id != req.params.id),
            `Já existe um cadastro com o email ${req.body.email}`);
    }

    ctrlBase.put(_repository, validationContract, req, res);
};

usuarioController.prototype.get = async (req, res) => {
    ctrlBase.get(_repository, req, res);
};

usuarioController.prototype.getById = async (req, res) => {
    ctrlBase.getById(_repository, req, res);
};

usuarioController.prototype.delete = async (req, res) => {
    ctrlBase.delete(_repository, req, res);
};

usuarioController.prototype.autenticar = async(req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    validationContract.isRequired(req.body.senha, 'Informe sua senha');

    if(!validationContract.isValid()) {
        res.status(400).send({message: 'Não foi possível efetuar o login', validation: validationContract.errors()});
        return;
    }

    let usuarioEncontrado = await _repository.auth(req.body.email, req.body.senha);
    console.log(usuarioEncontrado);
    if(usuarioEncontrado) {
        res.status(200).send({
            usuario: usuarioEncontrado,
            token: jwt.sign({user: usuarioEncontrado}, variables.Security.secretyKey)
        })
    } else {
        res.status(404).send({message: 'Usuário não encontrado'});
    }
}

module.exports = usuarioController;