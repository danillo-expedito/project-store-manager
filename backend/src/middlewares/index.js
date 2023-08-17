const saleMiddleware = require('./validateSaleFields');
const productMiddleware = require('./validateProductFields');

module.exports = {
    saleMiddleware,
    productMiddleware,
};