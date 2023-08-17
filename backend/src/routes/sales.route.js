const route = require('express').Router();
const { salesController } = require('../controllers');
// const { validateSaleFields } = require('../middlewares/validateProductFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', salesController.insertSale);

module.exports = route;