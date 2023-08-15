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

module.exports = {
    findAll,
    findById,
};