const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Environment } = require('../Environment');
const { Eva } = require('../Eva');
const evaParser = require('../../parser/evaParser');

describe('control statement tests', () => {
  let eva;
  const env = new Environment({
    null: null,
    nil: null,
    true: true,
    false: false,
  });

  beforeEach(() => {
    eva = new Eva(env);
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
});
