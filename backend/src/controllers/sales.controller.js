const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
    const { status, data } = await salesService.findAll();

    res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await salesService.findById(id);

    res.status(mapStatusHTTP(status)).json(data);
};

const insertSale = async (req, res) => {
    const { body } = req;

    const { status, data } = await salesService.create(body);

    res.status(mapStatusHTTP(status)).json(data);
};

const updateSale = async (req, res) => {
    const { saleId, productId } = req.params;
    const { quantity } = req.body;

    const { status, data } = await salesService.update(Number(saleId), Number(productId), quantity);

    res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;

    const { status, data } = await salesService.exclude(id);

    if (!data) return res.status(mapStatusHTTP(status)).send();

    res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    findAll,
    findById,
    insertSale,
    deleteSale,
    updateSale,
};