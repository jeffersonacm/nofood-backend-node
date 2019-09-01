'use strict';

const mongoose = require('mongoose');
const schema   = mongoose.Schema;

const produtoModel = new Schema({
    nome: { type: String, required: true, trim: true, index: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
    foto: { type: String, required: true },
    ativo: { type: Boolean, required: true },
    dataCriacao: { type: Date, default: Date.now },
}, { versionKey: true });

produtoModel.pre('save', next => {
    let agora = new Date();
    if(!this.dataCriacao)
        this.dataCriacao = agora;

    next();
});

module.exports = mongoose.model('produto', produtoModel);
