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

module.exports = {
    validateProductFields,
};