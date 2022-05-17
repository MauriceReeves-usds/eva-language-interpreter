const {
  expect, test, describe, beforeEach,
} = require('@jest/globals');
const { Environment } = require('../Environment');
const { Eva } = require('../Eva');

describe('block expression tests', () => {
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

  test('basic block', () => {
    expect(eva.eval(
      [
        'begin',
        ['var', 'x', 10],
        ['var', 'y', 20],
        ['+', ['*', 'x', 'y'], 30],
      ],
    )).toStrictEqual(230);
  });

  test('checking scoping in nested blocks', () => {
    expect(eva.eval(
      [
        'begin',
        ['var', 'x', 10],
        [
          'begin',
          ['var', 'x', 20],
          'x',
        ],
        'x',
      ],
    )).toStrictEqual(10);
  });

  test('checking scoping in nested blocks looks up parent scope variables', () => {
    expect(eva.eval(
      [
        'begin',
        ['var', 'x', 10],
        [
          'begin',
          ['var', 'y', ['+', 'x', 1]],
          'y',
        ],
      ],
    )).toStrictEqual(11);
  });

  test('setting variable from nested block', () => {
    expect(eva.eval(
      [
        'begin',
        ['var', 'data', 10],
        [
          'begin',
          ['set', 'data', 100],
        ],
        'data',
      ],
    )).toStrictEqual(100);
  });
});
