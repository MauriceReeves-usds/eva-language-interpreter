/* eslint-disable no-prototype-builtins */
/**
 * Environment: names storage
 */
class Environment {
  /**
     * Creates our environment and variable storage
     * @param {*} record
     * @param {*} parent
     */
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
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
   * Updates an existing variable
   * @param {*} name
   * @param {*} value
   */
  assign(name, value) {
    this.resolve(name).record[name] = value;
    return value;
  }

  /**
   * Attempt to get the value of the variable
   * @param {*} name
   */
  lookup(name) {
    return this.resolve(name).record[name];
  }

  /**
   * Scope resolution method
   * @param {*} name
   * @returns
   */
  resolve(name) {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }

    if (this.parent == null) {
      throw new ReferenceError(`Variable "${name}" is not defined.`);
    }

    return this.parent.resolve(name);
  }
}

module.exports = { Environment };
