module.exports = {
    removePropertyFromObject: (object, propertyRm) => {
        delete object[propertyRm];
        return object;
    }
}