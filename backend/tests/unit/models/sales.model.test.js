const chai = require('chai');
// const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesFromModelId } = require('../mocks/sales.mock');

const { expect } = chai;

describe('Realizando testes - SALES MODEL', function () {
    it('Recupera todos os produtos com sucesso', async function () {
        const retrievedSales = await salesModel.findAll();
        expect(retrievedSales).to.be.an('array');
        expect(retrievedSales).to.have.lengthOf(3);
    });
    it('Recupera o produto por id com sucesso', async function () {
        const id = 2;
        const saleById = await salesModel.findById(id);

        expect(saleById).to.be.an('array');

        expect(saleById).to.be.deep.equal(salesFromModelId);
    });
});