const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { productsFromDB } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes - PRODUCT CONTROLLER', function () {
    it('Deve retornar um array com o status 200', async function () {
        sinon.stub(productService, 'findAll').resolves({ status: 'OK', data: productsFromDB });

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.findAll(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsFromDB);
    });
    it('Não retorna um array, status 500', async function () {
        sinon.stub(productService, 'findAll')
        .resolves({ status: 'INTERNAL_ERROR', data: { message: 'Erro ao buscar produtos' } });

        const req = {};
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.findAll(req, res);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.json).to.have.been.calledWith({ message: 'Erro ao buscar produtos' });
    });
    it('Recupera um objeto de acordo com o id e com o status 200', async function () {
        sinon.stub(productService, 'findById').resolves({ status: 'OK', data: productsFromDB[1] });
        
        const req = { params: { id: 2 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.findById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsFromDB[1]);
    });
    it('Não recupera um objeto cujo o id é inválido e com o status 404', async function () {
        sinon.stub(productService, 'findById').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });

        const req = { params: { id: 10 } };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productController.findById(req, res);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    afterEach(function () {
        sinon.restore();
    });
});