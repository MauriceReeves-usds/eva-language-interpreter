const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Environment } = require('../Environment');
const { Eva } = require('../Eva');

describe('variable assignment tests', () => {
  let eva;

  beforeEach(() => {
    eva = new Eva(new Environment({
      true: true,
      false: false,
      nil: null,
      null: null,
    }));
  });

  test('simple assignment', () => {
    expect(eva.eval(['var', 'x', 10])).toStrictEqual(10);
    expect(eva.eval('x')).toStrictEqual(10);
  });

  test('check variable not defined error case', () => {
    const t = () => {
      eva.eval('y');
    };
    expect(t).toThrow(ReferenceError);
  });

  test('setting variable to built in global', () => {
    expect(eva.eval(['var', 'x', 'true'])).toStrictEqual(true);
  });

  test('setting variable to expression', () => {
    expect(eva.eval(['var', 'x', ['+', 2, 40]])).toStrictEqual(42);
  });
});
