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

module.exports = {
    findAll,
    findById,
};