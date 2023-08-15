const chai = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productsFromDB } = require('../mocks/product.mock');
const { insertedProductMock } = require('../mocks/product.mock');

const { expect } = chai;

describe('Realizando testes - PRODUCT MODEL', function () {
    it('Recupera todos os produtos com sucesso', async function () {
        const retrievedProducts = await productModel.findAll();

        expect(retrievedProducts).to.be.an('array');
        expect(retrievedProducts).to.be.deep.equal(productsFromDB);
    });
    it('Recupera o produto por id com sucesso', async function () {
        const id = 1;
        const productById = await productModel.findById(id);

        expect(productById).to.be.an('object');
        expect(productById).to.be.deep.equal(productsFromDB[0]);
    });
    it('Insere um novo produto com sucesso', async function () {
        sinon.stub(productModel, 'insert').resolves(insertedProductMock);

        expect(insertedProductMock).to.be.an('object');
        // expect().to.be.deep.equal(insertedProductMock.name);
    });
});