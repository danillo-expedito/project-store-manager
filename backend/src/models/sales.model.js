const { camelize } = require('../utils/formaters');
const connection = require('./connection');

const findAll = async () => {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM sales_products sp LEFT JOIN sales s ON s.id = sp.product_id;`;
    const [sales] = await connection.execute(query);
    if (sales.length === 0) return null;

    return camelize(sales);
};

const findAmountOfSales = async () => {
    const query = 'SELECT id FROM sales;';
    const [amount] = await connection.execute(query);
    if (amount.length === 0) return null;

    return amount;
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

const insert = async (saleProduct) => {
    const [{ insertId }] = await connection.execute('INSERT INTO sales (date) VALUES (DEFAULT);');
    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

    saleProduct.forEach(async (product) => {
        await connection.execute(
            query,
            [insertId, product.productId, product.quantity],
        );
    });
    const itemsSold = saleProduct;

    return { id: insertId, itemsSold };
};

module.exports = {
    findAll,
    findById,
    insert,
    findAmountOfSales,
};