const { salesModel } = require('../models');
const checkRequierdFields = require('../services/validations/checkRequiredFields');

const validateSaleFields = async (req, res, next) => {
    const requiredFields = ['productId', 'quantity'];
    const { body } = req;

    for (let i = 0; i < body.length; i += 1) {
        const error = checkRequierdFields(body[i], requiredFields);
        if (error) return res.status(400).json({ message: error });
    }

    next();
};

const validateUpdateSaleField = async (req, res, next) => {
    const { body } = req;
    const requiredFields = ['quantity'];

    const error = checkRequierdFields(body, requiredFields);
    if (error) return res.status(400).json({ message: error });

    next();
};

const validateQuantity = async (req, res, next) => {
    const { body } = req;
    
    for (let i = 0; i < body.length; i += 1) {
        if (body[i].quantity <= 0) {
           return res.status(422)
            .json({ message: '"quantity" must be greater than or equal to 1' });
        }
    }

    next();
};

// valida se há erro no id do produto e retorna uma mensagem de erro caso exista;
const validateId = async (req, res, next) => {
    const { body } = req;
    const sales = await salesModel.findAll();

    for (let i = 0; i < body.length; i += 1) {
        const productExists = sales.find((sale) => sale.productId === body[i].productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Product not found' });
        }
    }

    next();
};

module.exports = {
    validateSaleFields,
    validateQuantity,
    validateId,
    validateUpdateSaleField,
};