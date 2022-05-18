const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Eva } = require('../Eva');
const evaParser = require('../../parser/evaParser');

describe('defining and invoking user defined functions', () => {
  let eva;

  beforeEach(() => { eva = new Eva(); });

  test('test creating square function', () => {
    const exp = evaParser.parse(`
        (begin
            (def square (x)
                (* x x))

            (square 12))
    `);
    expect(eva.eval(exp)).toStrictEqual(144);
  });

  test('test function with nested body', () => {
    const exp = evaParser.parse(`
        (begin
            (def calc (x y)
                (begin
                    (var z 30)
                    (+ (* x y) z)
                ))
                
            (calc 10 20))
    `);
    expect(eva.eval(exp)).toStrictEqual(230);
  });
});
