import { isBetween } from './utils';

test('adds 1 + 2 to equal 3', () => {
  expect(isBetween(1, 3, 2)).toBe(true);
});
