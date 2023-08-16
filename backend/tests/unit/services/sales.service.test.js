const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromModel, salesFromDBId, insertResultMock, insertMock } = require('../mocks/sales.mock');

const { expect } = chai;

describe('Realizando testes - SALES SERVICE', function () {
    it('Recupera os dados das vendas e o status da requisição', async function () {
        sinon.stub(salesModel, 'findAll').resolves(salesFromModel);

        const { status, data } = await salesService.findAll();
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(salesFromModel);
    });
    it('Não recupera as vendas e retorna o status da requisição', async function () {
        sinon.stub(salesModel, 'findAll').resolves(null);

        const { status, data } = await salesService.findAll();
        expect(status).to.be.equal('INTERNAL_ERROR');
        expect(data.message).to.be.equal('No sales found');
    });
    it('Recupera venda de acordo com o id', async function () {
        sinon.stub(salesModel, 'findById').resolves(salesFromDBId);

        const { status, data } = await salesService.findById(2);
        expect(status).to.be.equal('OK');
        expect(data).to.be.an('array');
        expect(data).to.be.deep.equal(salesFromDBId);
    });
    it('Não recupera venda quando o id é inválido', async function () {
        sinon.stub(salesModel, 'findById').resolves(null);

        const { status, data } = await salesService.findById(8);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Sale not found');
    });
    it('Cria uma nova venda', async function () {
        sinon.stub(salesModel, 'insert').resolves(insertResultMock);

        const { status, data } = await salesService.create(insertMock);

        expect(status).to.be.equal('CREATED');
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(insertResultMock);
    });

    afterEach(function () {
        sinon.restore();
    });
});