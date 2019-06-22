const castPath = require('./private/_castPath');
const toKey = require('./private/_toKey');

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
};

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
