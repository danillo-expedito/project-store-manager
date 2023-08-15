const { camelize } = require('../utils/formaters');
const connection = require('./connection');

const findAll = async () => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM sales_products sp LEFT JOIN sales s ON s.id = sp.product_id;`;
    const [sales] = await connection.execute(query);
    if (sales.length === 0) return null;

    return camelize(sales);
};

const findById = async (id) => {
    const query = `SELECT sp.product_id, sp.quantity, s.date
    FROM sales_products sp LEFT JOIN sales s ON s.id = sp.product_id WHERE sp.sale_id = ?;`;
    const [sale] = await connection.execute(
        query,
        [id],
    );
    if (sale.length === 0) return null;

    return camelize(sale);
};

module.exports = {
    findAll,
    findById,
};