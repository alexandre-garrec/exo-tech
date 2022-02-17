const data = require('./expected_output.json');
const data2 = require('./output.json');

test('expected_output === output', () => {
  expect(data).toEqual(data2);
});
