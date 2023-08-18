const { salesModel } = require('../models');

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
};