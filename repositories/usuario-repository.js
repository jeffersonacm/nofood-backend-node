require('../models/usuario-model');
const base = require('../bin/base/repository-base');
const md5 = require('md5');

class usuarioRepository {
    constructor() {
        this.base = new base('Usuario');
        this.projetion = 'nome email _id'
    }

    async isEmailExist(Email) {
        return await this.base._model.findOne({ email: Email}, this.projetion);
    }

    async auth(Email, senha) {
        let _hashSenha = md5(senha);
        return this.base._model.findOne({ email: Email, senha: _hashSenha }, this.projetion);
    }

    async create(data) {
        let usuarioCriado = await this.base.create(data);
        return this.base._model.findById(usuarioCriado._id, this.projetion);
    }

    async update(id, data) {
        let usuarioAtualizado = await this.base._model.findByIdAndUpdate(id, {
            nome: data.nome,
            email: data.email,
            foto: data.foto
        });

        return this.base._model.findById(usuarioAtualizado, this.projetion);
    }

    async getAll() {
        return await this.base._model.find({}, this.projetion);
    }

    async getById(id) {
        return await this.base._model.findById(id , 'nome email _id foto');
    }

    async delete(id) {
        return await this.base._model.findByIdAndRemove(id);
    }
}

module.exports = usuarioRepository;