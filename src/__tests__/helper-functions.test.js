const {
  expect, test, describe,
} = require('@jest/globals');
const { isNumber, isString } = require('../Eva');

describe('All the helper functions', () => {
  test('check isNumber', () => {
    // positive cases
    expect(isNumber(1)).toStrictEqual(true);
    expect(isNumber(42.0)).toStrictEqual(true);
    expect(isNumber(0xab)).toStrictEqual(true);
    expect(isNumber(-1)).toStrictEqual(true);
    // negative cases
    expect(isNumber('hello')).toStrictEqual(false);
    expect(isNumber(null)).toStrictEqual(false);
  });

  test('check isString', () => {
    // positive cases
    expect(isString('""')).toStrictEqual(true);
    expect(isString('"eva"')).toStrictEqual(true);
    expect(isString('"hello eva"')).toStrictEqual(true);
    // negative cases
    expect(isString(null)).toStrictEqual(false);
    expect(isString(5)).toStrictEqual(false);
  });
});
