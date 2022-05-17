const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Eva } = require('../Eva');
const evaParser = require('../../parser/evaParser');

describe('control statement tests', () => {
  let eva;

  beforeEach(() => {
    eva = new Eva();
  });

  test('check the if statement', () => {
    expect(eva.eval([
      'begin',
      ['var', 'x', 10],
      ['var', 'y', 0],
      ['if', ['>', 'x', 10],
        ['set', 'y', 20],
        ['set', 'y', -20],
      ],
    ])).toStrictEqual(-20);
  });

  test('check the while statement', () => {
    expect(eva.eval([
      'begin',
      ['var', 'counter', 0],
      ['var', 'result', 0],
      ['while', ['<', 'counter', 10],
        ['begin',
          ['set', 'result', ['+', 'result', 1]],
          ['set', 'counter', ['+', 'counter', 1]],
        ],
      ],
      'result',
    ])).toStrictEqual(10);
  });

  test('parsing eva statement', () => {
    const exp = evaParser.parse(`
      (begin
        (var counter 0)
        (var result 0)
        (while (< counter 10)
            (begin
                (set result (+ result 1))
                (set counter (+ counter 1)))))
      `);
    expect(eva.eval(exp)).toStrictEqual(10);
  });

  test('parsing inc statement', () => {
    const exp = evaParser.parse(`
      (begin
        (var counter 0)
        (var result 0)
        (while (< counter 10)
            (begin
                (set result (inc result))
                (set counter (inc counter)))))
      `);
    expect(eva.eval(exp)).toStrictEqual(10);
  });

  test('parsing dec statement', () => {
    const exp = evaParser.parse(`
      (begin
        (var counter 10)
        (while (> counter 0)
            (begin
                (set counter (dec counter)))))
      `);
    expect(eva.eval(exp)).toStrictEqual(0);
  });
});
