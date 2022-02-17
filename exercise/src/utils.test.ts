import { isBetween } from './utils';

test('2 is between + 2 to equal 3', () => {
  expect(isBetween(1, 3, 2)).toBe(true);
});

test('4 is not between + 2 to equal 3', () => {
  expect(isBetween(1, 3, 4)).toBe(false);
});
