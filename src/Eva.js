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
   *
   */
class Eva {
  // eslint-disable-next-line class-methods-use-this
  eval(exp) {
    // self evaluating expressions
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    // unhandled cases
    throw new Error('Uninplemented');
  }
}

module.exports = { Eva, isNumber, isString };