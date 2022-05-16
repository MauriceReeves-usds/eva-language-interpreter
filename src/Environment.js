/**
 * Environment: names storage
 */
class Environment {
  /**
     * Creates our environment and variable storage
     * @param {*} record
     */
  constructor(record = {}) {
    this.record = record;
  }

  /**
     * Defines a name and value pair
     * @param {*} name
     * @param {*} value
     */
  define(name, value) {
    this.record[name] = value;
    return value;
  }

  /**
   * Attempt to get the value of the variable
   * @param {*} name
   */
  lookup(name) {
    // eslint-disable-next-line no-prototype-builtins
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable "${name}" is not defined.`);
    }
    return this.record[name];
  }
}

module.exports = { Environment };
