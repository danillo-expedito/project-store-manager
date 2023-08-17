const { salesModel } = require('../models');
const checkRequierdFields = require('../services/validations/checkRequiredFields');

const validateNameLenght = (name) => {
    if (name.length < 5) return '"name" length must be at least 5 characters long';
};

const validateProductFields = (req, res, next) => {
    const requiredFields = ['name'];
    const { body } = req;
    const productError = checkRequierdFields(body, requiredFields);
    if (productError) return res.status(400).json({ message: productError });
   
    const nameError = validateNameLenght(body.name);
    if (nameError) return res.status(422).json({ message: nameError });

    next();
};

const validateSale = async (item, requiredFields, res) => {
        const saleError = checkRequierdFields(item, requiredFields);
        if (saleError) return res.status(400).json({ message: saleError });

        const quantityError = item.quantity < 1;
        if (quantityError) {
          return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
        }
    
        const isProductValid = await salesModel.findById(item.productId);
        if (!isProductValid) {
            return res.status(422).json({ message: 'Product not found' });
        }
};

const validateSaleFields = async (req, res, next) => {
    const requiredFields = ['productId', 'quantity'];
    const { body } = req;

    const saleaz = body.map((item) => validateSale(item, requiredFields, res));
    await Promise.all(saleaz);
    
    next();
};

module.exports = {
    validateProductFields,
    validateSaleFields,
};