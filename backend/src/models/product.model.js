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
        id: Number(id),
        name,
    };
};

const exclude = async (id) => {
    try {
        const query = 'DELETE FROM products WHERE id = ?';
        console.log('Executing query:', query, 'with id:', id);
        await connection.execute(query, [id]);
        console.log(`Product with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

const searchProduct = async (name) => {
    const query = 'SELECT * FROM products WHERE name LIKE ?';
    const [product] = await connection.execute(query, [`%${name}%`]);
    console.log(product);
    
    return product;
};

module.exports = {
    findAll,
    findById,
    insert,
    update,
    exclude,
    searchProduct,
};