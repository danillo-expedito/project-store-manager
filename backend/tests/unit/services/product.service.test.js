const chai = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsFromDB, insertedProductMock } = require('../mocks/product.mock');
const { productService } = require('../../../src/services');

const { expect } = chai;

describe('Realizando testes - PRODUCT SERVICE', function () {
    it('Recupera os dados dos produtos e o status da requisição', async function () {
        sinon.stub(productModel, 'findAll').resolves(productsFromDB);

        const { status, data } = await productService.findAll();
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(productsFromDB);
    });
    it('Não recupera os produtos e retorna o status da requisição', async function () {
        sinon.stub(productModel, 'findAll').resolves(null);

        const { status, data } = await productService.findAll();
        expect(status).to.be.equal('INTERNAL_ERROR');
        expect(data.message).to.be.equal('Erro ao buscar produtos');
    });
    it('Recupera um produto de acordo com o id', async function () {
        sinon.stub(productModel, 'findById').resolves(productsFromDB[0]);

        const { status, data } = await productService.findById(1);
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(productsFromDB[0]);
    });
    it('Não recupera um produto quando o id é inválido', async function () {
        sinon.stub(productModel, 'findById').resolves(null);

        const { status, data } = await productService.findById(8);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Product not found');
    });
    it('Cria um novo produto com sucesso e retorna o status da requisição', async function () {
        sinon.stub(productModel, 'insert').resolves(insertedProductMock);

        const { status, data } = await productService.create(insertedProductMock.name);
        expect(status).to.be.equal('CREATED');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(insertedProductMock);
    });

    afterEach(function () {
        sinon.restore();
    });
});