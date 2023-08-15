const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesFromModel, salesFromDBId } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER', function () {
    it('Deve retornar um array com o status 200', async function () {
        sinon.stub(salesService, 'findAll').resolves({ status: 'OK', data: salesFromModel });

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.findAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesFromModel);
    });
    it('Não retorna um array, status 500', async function () {
        sinon.stub(salesService, 'findAll')
        .resolves({ status: 'INTERNAL_ERROR', data: { message: 'No sales found' } });

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.findAll(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ message: 'No sales found' });
    });
    it('Recupera um objeto de acordo com o id e com o status 200', async function () {
        sinon.stub(salesService, 'findById').resolves({ status: 'OK', data: salesFromDBId });
        
        const req = { params: { id: 2 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.findById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(salesFromDBId);
    });
    it('Não recupera um objeto cujo o id é inválido e com o status 404', async function () {
        sinon.stub(salesService, 'findById').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

        const req = { params: { id: 10 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.findById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    afterEach(function () {
        sinon.restore();
    });
});