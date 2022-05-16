const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Eva } = require('../Eva');

describe('top level eva test cases', () => {
  let eva;

  beforeEach(() => {
    eva = new Eva();
  });

  test('eval a number', () => {
    expect(eva.eval(42)).toStrictEqual(42);
  });

  test('eval a string', () => {
    expect(eva.eval('"hello eva"')).toStrictEqual('hello eva');
  });

  test('eval basic addition', () => {
    expect(eva.eval(['+', 1, 5])).toStrictEqual(6);
  });

  test('eval longer addition', () => {
    expect(eva.eval(['+', 1, 1, 2, 3, 5, 8, 13])).toStrictEqual(33);
  });

  test('eval nested addition', () => {
    expect(eva.eval(['+', 1, ['+', 2, 5]])).toStrictEqual(8);
  });
});
