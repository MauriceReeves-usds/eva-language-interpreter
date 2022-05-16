const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Eva } = require('../Eva');

describe('eva math test cases', () => {
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

  test('eval multiplication', () => {
    expect(eva.eval(['*', 8, 5])).toStrictEqual(40);
  });

  test('eval nested multiplication', () => {
    expect(eva.eval(['*', ['*', 3, 3], 2])).toStrictEqual(18);
  });

  test('eval subtraction', () => {
    expect(eva.eval(['-', 42, 7])).toStrictEqual(35);
  });

  test('eval mega subtraction', () => {
    expect(eva.eval(['-', 42, 7, 7, 7, 7, 7, 7])).toStrictEqual(0);
  });

  test('eval division', () => {
    expect(eva.eval(['/', 25, 5])).toStrictEqual(5);
  });

  test('eval mega division', () => {
    expect(eva.eval(['/', 25, 5, 5])).toStrictEqual(1);
  });

  test('eval decimal division', () => {
    expect(eva.eval(['/', 25, 2.0])).toStrictEqual(12.5);
  });
});
