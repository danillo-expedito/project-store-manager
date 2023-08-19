const validateQtd = (quantity) => {
    if (quantity <= 0) {
        return '"quantity" must be greater than or equal to 1';
    }
};

module.exports = validateQtd;