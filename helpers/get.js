/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
const reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (Array.isArray(value)) {
    return false;
  }
  const type = typeof value;
  if (type === 'number' || type === 'symbol' || type === 'boolean' || value == null) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value)
    || (object != null && value in Object(object));
}

/** Used to match property names within property paths. */
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
const reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
const stringToPath = (string) => {
  const result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, (match, number, quote, subString) => {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
};

const toString = (value) => {
  if (value === null) { return ''; }

  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(toString) + '';
  }
  return value + '';
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (Array.isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value === 'string') {
    return value;
  }

  return value + '';
}


const baseGet = (object, path) => {
  const modifiedPath = castPath(path, object);
  let newObject = Object.assign({}, object);

  let index = 0;
  const { length } = modifiedPath;

  while (newObject != null && index < length) {
    newObject = newObject[toKey(modifiedPath[index])];
    index += 1;
  }
  return (index && index === length) ? newObject : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * */
module.exports = (object, path, defaultValue) => {
  const result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
};
