const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productMiddleware } = require('../../../src/middlewares');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o middleware validateProductFields', function () {
    it('Chama next() se não houver erros', async function () {
        const next = sinon.stub().returns();
        const req = { body: { name: 'Produto 1' } };
        const res = {};

        await productMiddleware.validateProductFields(req, res, next);

        expect(next).to.have.been.calledWith();
    });
    it('Retorna um erro se o campo "name" não for enviado', async function () {
        const next = sinon.stub().returns();
        const req = { body: { } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productMiddleware.validateProductFields(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
    it('Retorna um erro se o campo "name" possuir menos de 5 caracteres', async function () {
        const next = sinon.stub().returns();
        const req = { body: { name: 'Prod' } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productMiddleware.validateProductFields(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
});