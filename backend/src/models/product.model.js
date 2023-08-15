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

const insert = async (name) => {
    const query = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await connection.execute(query, [name]);

    return { 
        id: insertId,
        name,
    };
};

module.exports = {
    findAll,
    findById,
    insert,
};