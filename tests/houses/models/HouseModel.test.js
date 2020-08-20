const HouseModel = require('../../../src/houses/models/HouseModel');
const HouseInterface = require('../../../src/houses/interfaces/models/ModelInterface');
const DriverMock = require('../mocks/MockDatabaseDriver');
const randomString = require('random-string');

describe('HouseModel', () => {

    let randomStringLength;
    let modelName;
    let schema;
    let houseModel;

    beforeEach(() => {
        randomStringLength = 20;
        modelName = randomString({ length: randomStringLength });
        schema = { schema: randomString({ length: randomStringLength }) };
        houseModel = new HouseModel(DriverMock, modelName, schema);
    });

    test('Should extends from model interface', () => {
        expect(houseModel.modelName).toEqual(modelName);
        expect(houseModel.schema).toEqual(schema.schema);
        expect(houseModel.driver).toEqual(DriverMock);
    });

    test('Should create model', () => {
        expect(DriverMock.createModel).toBeCalled();
    });

    test('Should findAll all with errors', done => {
        const error = randomString({ length: randomStringLength });
        const info = undefined;
        DriverMock.findAll = (model, select, cb) => cb(error, info);

        houseModel.findAll().then(() => {
            done.fail("It should not execute THEN when error");
        }).catch(() => {
            done();
        });
    });

    test('Should findAll no errors', done => {
        const error = undefined;
        const info = randomString({ length: randomStringLength });
        DriverMock.findAll = (model, select, cb) => cb(error, info);

        houseModel.findAll().then(() => {
            done();
        }).catch(() => {
            done.fail("It should not execute CATCH when error");            
        });
    });

    test('Should findById all with errors', done => {
        const error = randomString({ length: randomStringLength });
        const info = undefined;
        DriverMock.findById = (model, id, select, cb) => cb(error, info);

        houseModel.findById().then(() => {
            done.fail("It should not execute THEN when error");
        }).catch(() => {
            done();
        });
    });

    test('Should findById no errors', done => {
        const error = undefined;
        const info = randomString({ length: randomStringLength });
        DriverMock.findById = (model, id, select, cb) => cb(error, info);

        houseModel.findById().then(() => {
            done();
        }).catch(() => {
            done.fail("It should not execute CATCH when error");
        });
    });

    test('Should saveInfo all with errors', done => {
        const error = randomString({ length: randomStringLength });
        const info = undefined;
        DriverMock.save = (model, info, cb) => cb(error, info)

        houseModel.saveInfo().then(() => {
            done.fail("It should not execute THEN when error");
        }).catch(() => {
            done();
        });
    });

    test('Should saveInfo no errors', done => {
        const error = undefined;
        const info = randomString({ length: randomStringLength });
        DriverMock.save = (model, info, cb) => cb(error, info);

        houseModel.saveInfo().then(() => {
            done();
        }).catch(() => {
            done.fail("It should not execute CATCH when error");
        });
    });

    test('Should editInfo all with errors', done => {
        const error = randomString({ length: randomStringLength });
        const info = undefined;
        DriverMock.edit = (model, filter, update, cb) => cb(error, info)

        houseModel.editInfo().then(() => {
            done.fail("It should not execute THEN when error");
        }).catch(() => {
            done();
        });
    });

    test('Should editInfo no errors', done => {
        const error = undefined;
        const info = randomString({ length: randomStringLength });
        DriverMock.edit = (model, filter, update, cb) => cb(error, info);

        houseModel.editInfo().then(() => {
            done();
        }).catch(() => {
            done.fail("It should not execute CATCH when error");
        });
    });
});
