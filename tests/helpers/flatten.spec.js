const { expect } = require('chai');
const { flatten } = require('../../helpers');

describe('flatten helper', () => {
  it('Should be a function', () => {
    expect(flatten).to.be.an('function');
  });

  it('Should support flattening of nested arrays', () => {
    const array = [1, [2, [3, [4]], 5]];

    expect(flatten(array)).to.deep.equal([1, 2, [3, [4]], 5]);
  });

  it('Should treat sparse arrays as dense', () => {
    const array = [[1, 2, 3], Array(3)];
    const expected = [1, 2, 3];

    expected.push(undefined, undefined, undefined);

    const actual = flatten(array);
    expect(actual).to.deep.equal(expected);
    expect('4' in actual).to.equal(true);
  });

  it('Should work with empty arrays', () => {
    const array = [[], [[]], [[], [[[]]]]];

    expect(flatten(array)).to.deep.equal([[], [], [[[]]]]);
  });

  it('Should return an empty array for non array-like objects', () => {
    const expected = [];
    const nonArray = { 0: 'a' };

    expect(flatten(nonArray)).to.deep.equal(expected);
  });

  it('Should return an empty array for nullable values', () => {
    expect(flatten(null)).to.deep.equal([]);
  });
});
