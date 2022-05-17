const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { GlobalEnvironment } = require('../Eva');

describe('global environments tests', () => {
  beforeEach(() => {});

  test('test add', () => {
    const fn = GlobalEnvironment.record['+'];
    expect(fn([5, 5])).toStrictEqual(10);
  });

  test('test unary subtract', () => {
    const fn = GlobalEnvironment.record['-'];
    expect(fn([5])).toStrictEqual(-5);
  });

  test('test subtract values', () => {
    const fn = GlobalEnvironment.record['-'];
    expect(fn([25, 5, 4, 3, 2, 1])).toStrictEqual(10);
  });

  test('test multiplication', () => {
    const fn = GlobalEnvironment.record['*'];
    expect(fn([7, 6])).toStrictEqual(42);
    expect(fn([3, 4, 12])).toStrictEqual(144);
  });

  test('test division', () => {
    const fn = GlobalEnvironment.record['/'];
    expect(fn([144, 12])).toStrictEqual(12);
    expect(fn([25, 2.0])).toStrictEqual(12.5);
  });
});
