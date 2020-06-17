const HouseModel = require('../../../src/houses/models/HouseModel');
const HouseInterface = require('../../../src/houses/interfaces/models/ModelInterface');

describe('HouseModel', () => {

    test('Should extends from model interface', () => {
        expect(HouseInterface.constructor).toBeCalled();
    });
});