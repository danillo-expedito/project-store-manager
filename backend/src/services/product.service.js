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

const productExists = async (id) => {
    const verifyProduct = await productModel.findById(id);
    if (!verifyProduct) {
        return 'Product not found';
    }
};

const update = async (id, name) => {
    const error = await productExists(id);
    if (error) {
        return { status: 'NOT_FOUND', data: { message: error } };
    }
    
    const updatedProduct = await productModel.update(id, name);
    return { status: 'OK', data: updatedProduct };
};

const exclude = async (id) => {
    const error = await productExists(id);
    if (error) {
        return { status: 'NOT_FOUND', data: { message: error } };
    }
    
    await productModel.exclude(id);
    return { status: 'DELETED' };
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    exclude,
    productExists,
};