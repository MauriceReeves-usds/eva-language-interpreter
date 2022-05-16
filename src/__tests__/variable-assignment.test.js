const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Eva } = require('../Eva');

describe('variable assignment tests', () => {
  let eva;

  beforeEach(() => {
    eva = new Eva();
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
});
