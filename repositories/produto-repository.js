require('../models/produto-model');
const base = require('../bin/base/repository-base');

class produtoRepository {
    constructor() {
        this.base = new base('Produto');
    }

    async create(data) {
        return await this.base.create(data);
    }

    async update(id, data) {
        return await this.base.findByIdAndUpdate(id, data);
    }

    async getAll() {
        return await this.base.getAll();
    }

    async getById(id) {
        return await this.base.findById(id);
    }

    async delete(id) {
        return await this.base.findByIdAndRemove(id);
    }
}

module.exports = produtoRepository;