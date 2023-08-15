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

module.exports = {
    findAll,
    findById,
};