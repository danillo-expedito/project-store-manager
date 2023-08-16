const salesFromDB = [
    {
      saleId: 1,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      productId: 3,
      quantity: 15,
    },
];

const salesFromModel = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: '2023-08-15T20:46:52.000Z',
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: '2023-08-15T20:46:52.000Z',
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: null,
  },
];

const salesFromDBId = [
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
    insertMock,
    insertResultMock,
};