const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleMiddleware } = require('../../../src/middlewares');
const { salesBodyWithoutProductId, salesBodyWithoutQuantity, salesBodyWithInvalidQuantity, salesBodyWithInvalidProductId } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o middleware validateSaleFields', function () {
    it('Chama next() se não houver erros', async function () {
        const next = sinon.stub().returns();        
        const req = {
            body: [
              { productId: 1, quantity: 1 },
              { productId: 2, quantity: 5 },
            ],
          };
          const res = {};

          await saleMiddleware.validateSaleFields(req, res, next);

          expect(next).to.have.been.calledWith();
    });
    it('Deve retornar status 400 se não houver productId', async function () {
        const next = sinon.stub().returns();
        const req = {
            body: salesBodyWithoutProductId };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub().returns(),
          };

          await saleMiddleware.validateSaleFields(req, res, next);

          expect(res.status).to.have.been.calledWith(400);
          expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
    it('Deve retornar status 400 se não houver quantity', async function () {
        const next = sinon.stub().returns();
        const req = { body: salesBodyWithoutQuantity };

          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub().returns(),
          };

          await saleMiddleware.validateSaleFields(req, res, next);

          expect(res.status).to.have.been.calledWith(400);
          expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
    it('Deve retornar status 422 se a quantidade for menor que 1', async function () {
        const next = sinon.stub().returns();
        const req = { body: salesBodyWithInvalidQuantity };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub().returns(),
          };

          await saleMiddleware.validateQuantity(req, res, next);

          expect(res.status).to.have.been.calledWith(422);
          expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
    it('Deve retornar status 404 se o id do produto não existir', async function () {
        const next = sinon.stub().returns();
        const req = { body: salesBodyWithInvalidProductId };
          const res = {
              status: sinon.stub().returnsThis(),
              json: sinon.stub().returns(),
          };

          await saleMiddleware.validateId(req, res, next);

          expect(res.status).to.have.been.calledWith(404);
          expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
});