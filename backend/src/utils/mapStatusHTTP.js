const httpErrorMap = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INVALID_VALUES: 422,
    INTERNAL_ERROR: 500,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = mapStatusHTTP;