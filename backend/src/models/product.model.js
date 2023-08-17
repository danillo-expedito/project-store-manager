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

const update = async (id, name) => {
    const query = 'UPDATE products SET name = ? WHERE id = ?';
    await connection.execute(query, [name, id]);

    return { 
        id,
        name,
    };
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
};