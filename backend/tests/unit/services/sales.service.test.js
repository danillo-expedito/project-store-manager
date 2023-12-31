const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesFromModel, salesFromDBId, insertResultMock, insertMock, salesResponseUpdate } = require('../mocks/sales.mock');

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
    it('Exclui uma venda com sucesso e retorna o status da requisição', async function () {
        sinon.stub(salesModel, 'exclude').resolves();

        const { status } = await salesService.exclude(1);

        expect(status).to.be.equal('DELETED');
    });
    it('Não exclui uma venda quando o id é inválido', async function () {
        sinon.stub(salesModel, 'findById').resolves(null);

        const { status, data } = await salesService.exclude(8);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Sale not found');
    });
    it('Atualiza uma venda com sucesso', async function () {
        sinon.stub(salesModel, 'update').resolves(salesResponseUpdate);

        const { status, data } = await salesService.update(1, 1, 2);

        expect(status).to.be.equal('OK');
        expect(salesModel.update.called).to.be.equal(true);
        expect(data).to.be.an('object');
        expect(data).to.be.deep.equal(salesResponseUpdate);
    });
    it('Não atualiza uma venda quando o id é inválido', async function () {
        sinon.stub(salesModel, 'findProductAndSale').resolves('Sale not found');

        const { status, data } = await salesService.update(8, 1, 2);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Sale not found');
    });
    it('Não atualiza uma venda quando o id do produto é inválido', async function () {
        sinon.stub(salesModel, 'findProductAndSale').resolves('Product not found in sale');

        const { status, data } = await salesService.update(1, 8, 2);
        expect(status).to.be.equal('NOT_FOUND');
        expect(data.message).to.be.equal('Product not found in sale');
    });
    it('Não atualiza uma venda quando a quantidade é inválida', async function () {
        sinon.stub(salesModel, 'findProductAndSale').resolves(null);

        const { status, data } = await salesService.update(1, 1, 0);
        expect(status).to.be.equal('INVALID_VALUES');
        expect(data.message).to.be.equal('"quantity" must be greater than or equal to 1');
    });

    afterEach(function () {
        sinon.restore();
    });
});