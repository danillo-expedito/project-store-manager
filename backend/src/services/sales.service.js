const { salesModel } = require('../models');
const validateQtd = require('./validations/validateQtd');

const findAll = async () => {
    const allSales = await salesModel.findAll();
    if (!allSales) return { status: 'INTERNAL_ERROR', data: { message: 'No sales found' } };

    return { status: 'OK', data: allSales };
};

const findById = async (id) => {
    const saleById = await salesModel.findById(id);
    if (!saleById) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };

    return { status: 'OK', data: saleById };
};

const create = async (itensSold) => {
    const insertedSale = await salesModel.insert(itensSold);
    if (!insertedSale) return { status: 'INTERNAL_ERROR', data: { message: 'Sale not inserted' } };

    return { status: 'CREATED', data: insertedSale };
};

const update = async (saleId, productId, quantity) => {
    const error = await salesModel.findProductAndSale(saleId, productId);
    if (error) {
        return { status: 'NOT_FOUND', data: { message: error } };
    }
    
    const errorQtd = validateQtd(quantity);
    if (errorQtd) return { status: 'INVALID_VALUES', data: { message: errorQtd } };

    const updatedSale = await salesModel.update(saleId, productId, quantity);
    if (!updatedSale) return { status: 'INTERNAL_ERROR', data: { message: 'Sale not updated' } };

    return { status: 'OK', data: updatedSale };
};

const exclude = async (id) => {
    const saleExists = await findById(id);
    if (saleExists.status === 'NOT_FOUND') return saleExists;

    await salesModel.exclude(id);
    return { status: 'DELETED' };
};

module.exports = {
    findAll,
    findById,
    create,
    exclude,
    update,
};