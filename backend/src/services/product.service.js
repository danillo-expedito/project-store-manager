const { productModel } = require('../models');

const findAll = async () => {
    const products = await productModel.findAll();
    if (!products) {
        return { status: 'INTERNAL_ERROR', data: { message: 'Erro ao buscar produtos' } };
    }

    return { status: 'OK', data: products };
};

const findById = async (id) => {
    const product = await productModel.findById(id);
    if (!product) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }

    return { status: 'OK', data: product };
};

const create = async (name) => {
    const newProduct = await productModel.insert(name);
    return { status: 'CREATED', data: newProduct };
};

const update = async (id, name) => {
    const productExists = await productModel.findById(id);
    if (!productExists) {
        return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }

    const updatedProduct = await productModel.update(id, name);
    return { status: 'OK', data: updatedProduct };
};

module.exports = {
    findAll,
    findById,
    create,
    update,
};