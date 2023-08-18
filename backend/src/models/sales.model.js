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

const findProductAndSale = async (saleId, productId) => {
    const querySaleId = 'SELECT * FROM sales_products WHERE sale_id = ?;';
    const queryProductId = 'SELECT * FROM sales_products WHERE sale_id = ? AND product_id = ?;';
    const [[sale]] = await connection.execute(querySaleId, [saleId]);
    const [[product]] = await connection.execute(queryProductId, [saleId, productId]);

    if (!sale) return 'Sale not found';
    if (!product) return 'Product not found in sale';
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

const update = async (saleId, productId, quantity) => {
    const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;';
    await connection.execute(query, [quantity, saleId, productId]);

    return {
        date: new Date(),
        productId,
        quantity,
        saleId,
    };   
};

const exclude = async (id) => {
    const delSale = 'DELETE FROM sales WHERE id = ?';
    const delSaleProducts = 'DELETE FROM sales_products WHERE sale_id = ?';

    await connection.execute(delSale, [id]);
    console.log(`Sale with ID ${id} deleted!`);
    await connection.execute(delSaleProducts, [id]);
    console.log(`Sale products with ID ${id} deleted!`);
};

module.exports = {
    findAll,
    findById,
    insert,
    findAmountOfSales,
    exclude,
    update,
    findProductAndSale,
};