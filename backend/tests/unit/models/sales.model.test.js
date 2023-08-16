const chai = require('chai');
// const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { insertMock } = require('../mocks/sales.mock');

const { expect } = chai;

describe('Realizando testes - SALES MODEL', function () {
    it('Recupera todos as vendas com sucesso', async function () {
        const retrievedSales = await salesModel.findAll();
        expect(retrievedSales).to.be.an('array');
    });
    it('Recupera a venda por id com sucesso', async function () {
        const id = 2;
        const saleById = await salesModel.findById(id);

        expect(saleById).to.be.an('array');
    });
    it('Insere uma venda com sucesso', async function () {
        const sale = await salesModel.insert(insertMock);
        const sales = await salesModel.findAmountOfSales();

        const id = sales.length;
    
        expect(sale).to.be.an('object');
        expect(sale).to.have.property('id');
        expect(sale).to.be.deep.equal({ id, itemsSold: insertMock });
    });
});