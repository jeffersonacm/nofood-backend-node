'use strict';

const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const usuarioModel = new schema({
    nome: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    foto: { type: String },
    ativo: { type: Boolean },
    dataCriacao: { type: Date, default: Date.now },
});

usuarioModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;

    next();
});

module.exports = mongoose.model('Usuario', usuarioModel);
