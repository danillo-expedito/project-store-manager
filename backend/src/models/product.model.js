const connection = require('./connection');

const findAll = async () => {
    const [products] = await connection.execute(
        'SELECT * FROM products',
    );
    return products;
};

const findById = async (id) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const [[product]] = await connection.execute(query, [id]);

    return product;
};

module.exports = {
    findAll,
    findById,
};