const castPath = require('./private/_castPath');
const toKey = require('./private/_toKey');
const get = require('./get');
const set = require('./set');
const flatten = require('./flatten');

function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path) {
  const modifiedPath = castPath(path, object);
  let modifiedObject = object;

  let index = -1;
  const { length } = modifiedPath;
  let result = false;
  let key;

  while (index + 1 < length) {
    index += 1;
    key = toKey(modifiedPath[index]);
    result = modifiedObject != null && baseHasIn(modifiedObject, key);
    if (!result) {
      break;
    }
    modifiedObject = modifiedObject[key];
  }
  index += 1;
  if (result || index !== length) {
    return result;
  }
  return modifiedObject && !!modifiedObject.length;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path);
}

/**
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */

function basePickBy(object, paths, predicate) {
  let index = -1;
  const { length } = paths;
  const result = {};

  while (index + 1 < length) {
    index += 1;
    const path = paths[index];
    const value = get(object, path);

    if (predicate(value, path)) {
      set(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  const modifiedPaths = flatten(paths);
  return basePickBy(object, modifiedPaths, (value, path) => hasIn(object, path));
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * */
module.exports = (object, ...paths) => (
  object == null ? {} : basePick(object, paths)
);
