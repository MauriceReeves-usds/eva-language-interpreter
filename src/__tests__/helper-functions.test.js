const {
  expect, test, describe,
} = require('@jest/globals');
const { Eva } = require('../Eva');

describe('All the helper functions', () => {
  test('check isNumber', () => {
    // positive cases
    expect(Eva.isNumber(1)).toStrictEqual(true);
    expect(Eva.isNumber(42.0)).toStrictEqual(true);
    expect(Eva.isNumber(0xab)).toStrictEqual(true);
    expect(Eva.isNumber(-1)).toStrictEqual(true);
    // negative cases
    expect(Eva.isNumber('hello')).toStrictEqual(false);
    expect(Eva.isNumber(null)).toStrictEqual(false);
  });

  test('check isString', () => {
    // positive cases
    expect(Eva.isString('""')).toStrictEqual(true);
    expect(Eva.isString('"eva"')).toStrictEqual(true);
    expect(Eva.isString('"hello eva"')).toStrictEqual(true);
    // negative cases
    expect(Eva.isString(null)).toStrictEqual(false);
    expect(Eva.isString(5)).toStrictEqual(false);
  });
});
