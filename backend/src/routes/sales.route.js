const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSaleFields, validateId, 
    validateQuantity } = require('../middlewares/validateSaleFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSaleFields, validateQuantity, validateId, salesController.insertSale);

route.delete('/:id', salesController.deleteSale);
module.exports = route;