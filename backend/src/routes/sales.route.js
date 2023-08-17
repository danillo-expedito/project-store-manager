const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSaleFields, validateId } = require('../middlewares/validateSaleFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSaleFields, validateId, salesController.insertSale);

module.exports = route;