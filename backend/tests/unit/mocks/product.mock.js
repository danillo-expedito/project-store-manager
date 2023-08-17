const productsFromDB = [
  [
      {
        id: 1,
        name: 'Martelo de Thor',
      },
      {
        id: 2,
        name: 'Traje de encolhimento',
      },
      {
        id: 3,
        name: 'Escudo do Capitão América',
      },
  ],
  null,
];

const productsFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productFromDBId = [
  [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
  ],
];

const productFromModelId = { id: 1, name: 'Martelo de Thor' };

const insertedProductMock = {
  id: 4,
  name: 'Mjolnir',
};

const updateProductMock = {
  name: 'Martelo do Batman',
};

const updatedProductMock = {
  id: 1,
  name: 'Martelo do Batman',
};

module.exports = {
    productsFromDB,
    insertedProductMock,
    productsFromModel,
    productFromDBId,
    productFromModelId,
    updateProductMock,
    updatedProductMock,
};