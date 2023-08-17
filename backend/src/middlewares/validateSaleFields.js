const { salesModel } = require('../models');
const checkRequierdFields = require('../services/validations/checkRequiredFields');

// verifica os campos do body da requisição e retorna uma mensagem específica para cada campo que não esteja de acordo com o esperado;
const validateSale = async (item, requiredFields) => {
    const saleError = checkRequierdFields(item, requiredFields);
    if (saleError) return saleError;

    const quantityError = item.quantity < 1;
    if (quantityError) {
      return '"quantity" must be greater than or equal to 1';
    }
};

// valida se foram retornados erros no body da requisição e retorna uma mensagem de erro caso exista;
const validateSaleFields = async (req, res, next) => {
    const requiredFields = ['productId', 'quantity'];
    const { body } = req;

    const errorArr = body.map((item) => validateSale(item, requiredFields));
    Promise.all(errorArr).then((result) => {
        const [fieldError, quantityError] = result;

        if (fieldError) return res.status(400).json({ message: fieldError });
        if (quantityError) return res.status(422).json({ message: quantityError });

        if (!fieldError && !quantityError) return next();
    });
};

// verifica se o id do produto existe no banco de dados e retorna uma mensagem de erro caso não exista;
const idExists = async (id) => {
    const isProductValid = await salesModel.findById(id);
    if (!isProductValid) {
    return 'Product not found';
    }
};

// valida se há erro no id do produto e retorna uma mensagem de erro caso exista;
const validateId = async (req, res, next) => {
    const { body } = req;
    const idErrorMap = body.map((item) => idExists(item.productId));
    Promise.all(idErrorMap).then((result) => {
        const [idError] = result;
        if (idError) return res.status(422).json({ message: idError });

    next();
    });
};

module.exports = {
    validateSaleFields,
    validateId,
};