/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  let index = -1;
  const { length } = values;
  const offset = array.length;
  const newArray = array;

  while (index + 1 < length) {
    index += 1;
    newArray[offset + index] = values[index];
  }
  return newArray;
}

const isFlattenable = value => Array.isArray(value);

/**
 * @param {Array} array The array to flatten.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, predicate, result) {
  const depth = 1;
  let index = -1;
  const { length } = array;

  const predicateFunc = predicate || isFlattenable;
  const resultData = result || [];

  while (index + 1 < length) {
    index += 1;
    const value = array[index];
    if (depth > 0 && predicateFunc(value)) {
      arrayPush(resultData, value);
    } else {
      resultData[resultData.length] = value;
    }
  }
  return resultData;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * */
module.exports = (array) => {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array) : [];
};
