/* eslint-disable func-names */
const { Environment } = require('./Environment');

const GlobalEnvironment = new Environment({
  null: null,
  nil: null,
  true: true,
  false: false,
  VERSION: '0.1',
  // built-ins
  '+': function (values) {
    let result = 0;
    values.forEach((v) => {
      result += v;
    });
    return result;
  },
  '-': function (values) {
    if (values.length === 1) {
      return -values[0];
    }
    let result = values[0];
    values.slice(1).forEach((x) => {
      result -= x;
    });
    return result;
  },
  '*': function (values) {
    let result = 1;
    values.forEach((v) => {
      result *= v;
    });
    return result;
  },
  '/': function (values) {
    let result = values[0];
    values.slice(1).forEach((x) => {
      result /= x;
    });
    return result;
  },
});

/**
   *
   */
class Eva {
  /**
     * Creates the interpreter with a new environment
     * @param {*} global
     */
  constructor(global = GlobalEnvironment) {
    this.global = global;
  }

  /**
     * The eval method recursively evaluates each operation
     * in the Eva language as our grammar allows
     * @param {*} exp
     * @returns
     */
  eval(exp, env = this.global) {
    // ------------------------------------------
    // self evaluating expressions
    if (Eva.isNumber(exp)) {
      return exp;
    }

    if (Eva.isString(exp)) {
      return exp.slice(1, -1);
    }

    const lookAhead = exp[0];

    // ------------------------------------------
    // some mathematical expressions
    if (lookAhead === '+') {
      let result = 0;
      for (let x = 1; x < exp.length; x += 1) {
        result += this.eval(exp[x], env);
      }
      return result;
    }

    if (lookAhead === '*') {
      let result = 1;
      for (let x = 1; x < exp.length; x += 1) {
        result *= this.eval(exp[x], env);
      }
      return result;
    }

    if (lookAhead === '-') {
      let result = this.eval(exp[1]);
      for (let x = 2; x < exp.length; x += 1) {
        result -= this.eval(exp[x], env);
      }
      return result;
    }

    if (lookAhead === '/') {
      let result = this.eval(exp[1]);
      for (let x = 2; x < exp.length; x += 1) {
        result /= this.eval(exp[x], env);
      }
      return result;
    }

    // ------------------------------------------
    // comparison operators
    switch (lookAhead) {
      case '>':
        return this.eval(exp[1], env) > this.eval(exp[2], env);
      case '<':
        return this.eval(exp[1], env) < this.eval(exp[2], env);
      case '>=':
        return this.eval(exp[1], env) >= this.eval(exp[2], env);
      case '<=':
        return this.eval(exp[1], env) <= this.eval(exp[2], env);
      case '=':
      case 'eq':
        return this.eval(exp[1], env) === this.eval(exp[2], env);
      case '!=':
      case 'neq':
        return this.eval(exp[1], env) !== this.eval(exp[2], env);
      default:
        break;
    }

    // ------------------------------------------
    // block statements
    if (lookAhead === 'begin') {
      const blockEnv = new Environment({}, env);
      return this.evalBlock(exp, blockEnv);
    }

    // ------------------------------------------
    // variable definition
    if (lookAhead === 'var') {
      // eslint-disable-next-line no-unused-vars
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    // ------------------------------------------
    // variable definition
    if (lookAhead === 'set') {
      // eslint-disable-next-line no-unused-vars
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    // ------------------------------------------
    // variable look up
    if (Eva.isVariableName(exp)) {
      return env.lookup(exp);
    }

    // ------------------------------------------
    // variable look up
    if (lookAhead === 'if') {
      // eslint-disable-next-line no-unused-vars
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      }
      return this.eval(alternate, env);
    }

    if (lookAhead === 'while') {
      // eslint-disable-next-line no-unused-vars
      const [_tag, condition, body] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }
      return result;
    }

    // unhandled cases
    throw new Error(`Uninplemented: ${JSON.stringify(exp)}`);
  }

  /**
   * evaluates a block and returns the last evaluated value
   * @param {*} block
   * @param {*} env
   * @returns
   */
  evalBlock(block, env) {
    let result;

    // eslint-disable-next-line no-unused-vars
    const [_tag, ...expressions] = block;
    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });
    return result;
  }

  /**
 * Returns true if exp is a number
 * @param {*} exp
 * @returns
 */
  static isNumber(exp) {
    return typeof exp === 'number';
  }

  /**
   * Returns true is exp is a string and enclosed in double quotes
   * @param {*} exp
   * @returns
   */
  static isString(exp) {
    return typeof exp === 'string'
            && exp[0] === '"'
            && exp.slice(-1) === '"';
  }

  /**
   * Returns true if exp points to a variable
   * @param {*} exp
   */
  static isVariableName(exp) {
    return typeof exp === 'string'
          && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(exp);
  }
}

module.exports = { Eva, GlobalEnvironment };
