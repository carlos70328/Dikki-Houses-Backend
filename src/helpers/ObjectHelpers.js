module.exports = {
    removePropertyFromObject: (object, propertyRm) => {
        delete object[propertyRm];
        return object;
    },
    dataToJson: (data) => {
        return data.toJSON();
    }
}