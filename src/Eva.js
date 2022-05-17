const { Environment } = require('./Environment');

/**
 * Returns true if exp is a number
 * @param {*} exp
 * @returns
 */
function isNumber(exp) {
  return typeof exp === 'number';
}

/**
   * Returns true is exp is a string and enclosed in double quotes
   * @param {*} exp
   * @returns
   */
function isString(exp) {
  return typeof exp === 'string'
          && exp[0] === '"'
          && exp.slice(-1) === '"';
}

/**
 * Returns true if exp points to a variable
 * @param {*} exp
 */
function isVariableName(exp) {
  return typeof exp === 'string'
        && /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(exp);
}

/**
   *
   */
class Eva {
  /**
     * Creates the interpreter with a new environment
     * @param {*} global
     */
  constructor(global = new Environment()) {
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
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
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
    if (isVariableName(exp)) {
      return env.lookup(exp);
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
}

module.exports = { Eva, isNumber, isString };
