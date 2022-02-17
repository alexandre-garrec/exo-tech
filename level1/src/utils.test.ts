import { Article } from './interface/Article';
import { DeliveryFee } from './interface/DeliveryFee';
import { isBetween, getDeliveryFee, getArticlePriceSum } from './utils';

const data = require('../expected_output.json');
const data2 = require('../output.json');

test('2 is between + 2 to equal 3', () => {
  expect(isBetween(1, 3, 2)).toBe(true);
});

test('4 is not between + 2 to equal 3', () => {
  expect(isBetween(1, 3, 4)).toBe(false);
});

const fixtureDeliveryFee = [
  {
    eligible_transaction_volume: {
      min_price: 0,
      max_price: 1000,
    },
    price: 800,
  },
  {
    eligible_transaction_volume: {
      min_price: 1000,
      max_price: 2000,
    },
    price: 400,
  },
] as Array<DeliveryFee>;

test('delivery fee 800', () => {
  expect(getDeliveryFee(fixtureDeliveryFee, 40)).toBe(800);
});

test('delivery fee 400', () => {
  expect(getDeliveryFee(fixtureDeliveryFee, 1040)).toBe(400);
});

test('article price sum', () => {
  expect(
    getArticlePriceSum({ id: '1', items: [{ article_id: '1', quantity: 1 }] }, { '1': { price: 10 } as Article }, {})
  ).toBe(10);
});

test('article price sum with discount amount', () => {
  expect(
    getArticlePriceSum(
      { id: '1', items: [{ article_id: '1', quantity: 1 }] },
      { '1': { price: 10 } as Article },
      {
        '1': {
          article_id: '1',
          type: 'amount',
          value: 1,
        },
      }
    )
  ).toBe(9);
});

test('article price sum with discount percentage', () => {
  expect(
    getArticlePriceSum(
      { id: '1', items: [{ article_id: '1', quantity: 1 }] },
      { '1': { price: 10 } as Article },
      {
        '1': {
          article_id: '1',
          type: 'percentage',
          value: 10,
        },
      }
    )
  ).toBe(9);
});
