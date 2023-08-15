// formata a string de snake_case para camelCase
const camelCase = (str) => str
  .replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());

// utiliza Object.keys para pegar as chaves do objeto e formata-las
const convertObjectKeys = (obj) => Object.keys(obj).reduce((acc, key) => {
        const camelizedKey = camelCase(key);
        const value = obj[key];
        acc[camelizedKey] = value;
        return acc;
    }, {});

// verifica o tipo da entrada e faz a formatação
const camelize = (data) => {
    if (Array.isArray(data)) {
        return data.map((item) => convertObjectKeys(item));
    } 
    if (typeof data === 'object') {
        return convertObjectKeys(data);
    } 
    // if (typeof data === 'string') {
    //     return camelCase(data);
    // }

    return data;
};

module.exports = {
    camelize,
};