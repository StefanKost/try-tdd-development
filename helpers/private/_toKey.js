/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
module.exports = (value) => {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}`;
}
