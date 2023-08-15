const checkRequierdFields = (receivedFields, requiredFields) => {
    for (let i = 0; i < requiredFields.length; i += 1) {
        const currField = requiredFields[i];
        if (!(currField in receivedFields)) {
            return `"${currField}" is required`;
        }
    }
};

module.exports = checkRequierdFields;