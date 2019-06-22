const castPath = require('./private/_castPath');
const toKey = require('./private/_toKey');

const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value) {
  const type = typeof value;

  /** Used as references for various `Number` constants. */
  const MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  const reIsUint = /^(?:0|[1-9]\d*)$/;

  return (type === 'number'
      || (type !== 'symbol' && reIsUint.test(value)))
    && (value > -1 && value % 1 === 0 && value < MAX_SAFE_INTEGER);
}

/**
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value) {
  if (!isObject(object)) {
    return object;
  }
  const modifiedPath = castPath(path, object);

  let index = -1;
  const { length } = modifiedPath;
  const lastIndex = length - 1;
  let nested = object;

  while (nested != null && (index + 1) < length) {
    index += 1;
    const key = toKey(modifiedPath[index]);
    let newValue = value;

    if (index !== lastIndex) {
      const objValue = nested[key];
      if (isObject(objValue)) {
        newValue = objValue;
      } else {
        newValue = isIndex(modifiedPath[index + 1]) ? [] : {};
      }
    }
    nested[key] = newValue;
    nested = nested[key];
  }
  return object;
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * */
module.exports = (object, path, value) => (
  object == null ? object : baseSet(object, path, value)
);
