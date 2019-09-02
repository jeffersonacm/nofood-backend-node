require('../models/categoria-model');
const base = require('../bin/base/repository-base');

class categoriaRepository {
    constructor() {
        this.base = new base('Categoria');
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

module.exports = categoriaRepository;