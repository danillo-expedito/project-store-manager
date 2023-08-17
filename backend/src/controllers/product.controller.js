const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
  const { status, data } = await productService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { status, data } = await productService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNewProduct = async (req, res) => {
  const { name } = req.body;

  const { status, data } = await productService.create(name);

  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { status, data } = await productService.update(id, name);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  insertNewProduct,
  updateProduct,
};