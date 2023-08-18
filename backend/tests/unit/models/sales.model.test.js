const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { insertMock, salesFromDB, salesFromModel, salesFromDBId, salesFromModelId, insertResultMock } = require('../mocks/sales.mock');

const { expect } = chai;

describe('Realizando testes - SALES MODEL', function () {
    it('Recupera todos as vendas com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves(salesFromDB);

        const retrievedSales = await salesModel.findAll();

        expect(retrievedSales).to.be.an('array');
        expect(retrievedSales).to.be.deep.equal(salesFromModel);
    });
    it('Recupera a venda por id com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves(salesFromDBId);
        const id = 2;
        const saleById = await salesModel.findById(id);

        expect(saleById).to.be.an('array');
        expect(saleById).to.be.deep.equal(salesFromModelId);
    });
    it('Insere uma venda com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

        const sale = await salesModel.insert(insertMock);
    
        expect(sale).to.be.an('object');
        expect(sale).to.have.property('id');
        expect(sale).to.be.deep.equal(insertResultMock);
    });
    it('Exclui uma venda com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
        await salesModel.exclude(1);

        expect(connection.execute.calledTwice).to.be.equal(true);
    });

    afterEach(function () {
        sinon.restore();
    });
});