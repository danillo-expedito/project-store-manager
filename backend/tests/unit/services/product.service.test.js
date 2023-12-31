const chai = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsFromDB, insertedProductMock, productsFromModel, updatedProductMock, productFromModelId } = require('../mocks/product.mock');
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
        sinon.stub(productModel, 'findById').resolves(productsFromModel[0]);

        const { status, data } = await productService.findById(1);
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(productsFromModel[0]);
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
    it('Atualiza um produto com sucesso e retorna o status da requisição', async function () {
        sinon.stub(productModel, 'update').resolves(updatedProductMock);

        const { status, data } = await productService.update(1, updatedProductMock.name);

        expect(status).to.be.equal('OK');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(updatedProductMock);
    });
    it('Não atualiza um produto quando o id é inválido', async function () {
        sinon.stub(productModel, 'findById').resolves(null);

        const { status, data } = await productService.update(8, updatedProductMock.name);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Product not found');
    });
    it('Exclui um produto com sucesso e retorna o status da requisição', async function () {
        sinon.stub(productModel, 'exclude').resolves();

        const { status } = await productService.exclude(1);

        expect(status).to.be.equal('DELETED');
    });
    it('Não exclui um produto quando o id é inválido', async function () {
        sinon.stub(productModel, 'findById').resolves(null);
        sinon.stub(productService, 'productExists').resolves(undefined);

        const { status, data } = await productService.exclude(8);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Product not found');
    });
    it('Recupera um produto de acordo com o nome', async function () {
        sinon.stub(productModel, 'searchProduct').resolves([productsFromModel[0]]);

        const { status, data } = await productService.searchProduct('Martelo');
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal([productFromModelId]);
    });
    it('Retorna todos os produtos quando o query está vazio', async function () {
        sinon.stub(productModel, 'findAll').resolves(productsFromModel);

        const { status, data } = await productService.searchProduct('');
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(productsFromModel);
    });
    it('Retorna um array vazio caso nenhum produto seja encontrado com o query', async function () {
        sinon.stub(productModel, 'searchProduct').resolves(null);

        const { status, data } = await productService.searchProduct('Marmelada');
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal([]);
    });

    afterEach(function () {
        sinon.restore();
    });
});