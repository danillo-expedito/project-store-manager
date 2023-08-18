const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSaleFields, validateId, 
    validateQuantity, 
    validateUpdateSaleField } = require('../middlewares/validateSaleFields');

route.get('/', salesController.findAll);

route.get('/:id', salesController.findById);

route.post('/', validateSaleFields, validateQuantity, validateId, salesController.insertSale);

route.put(
  '/:saleId/products/:productId/quantity', 
  validateUpdateSaleField,
  validateQuantity,
  salesController.updateSale,
  );

route.delete('/:id', salesController.deleteSale);
module.exports = route;