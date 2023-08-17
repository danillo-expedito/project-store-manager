const mockDate = '2023-08-15T20:46:52.000Z';

const salesFromDB = [
  [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
      date: mockDate,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
      date: mockDate,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
      date: null,
    },
  ],
  null,
];

const salesFromModel = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: mockDate,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: mockDate,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: null,
  },
];

const salesFromDBId = [
  [
    {
      productId: 3,
      quantity: 15,
      date: null,
    },
  ],
  null,
];

const salesFromModelId = [
  {
    productId: 3,
    quantity: 15,
    date: null,
  },
];

const insertMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const insertResultMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
    salesFromDB,
    salesFromDBId,
    salesFromModel,
    salesFromModelId,
    insertMock,
    insertResultMock,
};