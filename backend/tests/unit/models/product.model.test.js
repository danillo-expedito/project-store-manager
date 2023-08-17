const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productsFromDB, productsFromModel, productFromDBId, productFromModelId } = require('../mocks/product.mock');
const { insertedProductMock } = require('../mocks/product.mock');

const { expect } = chai;

describe('Realizando testes - PRODUCT MODEL', function () {
    it('Recupera todos os produtos com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves(productsFromDB);
        const retrievedProducts = await productModel.findAll();

        expect(retrievedProducts).to.be.an('array');
        expect(retrievedProducts).to.be.deep.equal(productsFromModel);
    });
    it('Recupera o produto por id com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves(productFromDBId);
        const id = 1;
        const productById = await productModel.findById(id);

        expect(productById).to.be.an('object');
        expect(productById).to.be.deep.equal(productFromModelId);
    });
    it('Insere um novo produto com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
        const insertedProduct = await productModel.insert('Mjolnir');

        expect(insertedProduct).to.be.an('object');
        expect(insertedProduct).to.be.deep.equal(insertedProductMock);
    });
    it('Atualiza um produto com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        const updatedProduct = await productModel.update(1, 'Martelo do Batman');

        expect(updatedProduct).to.be.an('object');
        expect(updatedProduct).to.be.deep.equal({ id: 1, name: 'Martelo do Batman' });
    });

    afterEach(function () {
        sinon.restore();
    });
});