const chai = require('chai');
const { get } = require('../../helpers');

const { expect } = chai;

describe('Get helper', () => {
  it('Should be a function', () => {
    expect(get).to.be.a('function');
  });

  it('Should get deep property values', () => {
    const object = { a: { b: 2 } };
    const params = ['a.b', ['a', 'b']];

    params.forEach((param) => {
      expect(get(object, param)).to.equal(2);
    });
  });

  it('Should get a key over a path', () => {
    const object = { 'a.b': 1, a: { b: 2 } };
    const params = ['a.b', ['a.b']];

    params.forEach((param) => {
      expect(get(object, param)).to.equal(1);
    });
  });

  it('Should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 3, a: { b: { c: 4 } } };

    expect(get(object, ['a', 'b', 'c'])).to.equal(4);
  });

  it('Should not ignore empty brackets', () => {
    const object = { a: { '': 1 } };

    expect(get(object, 'a[]')).to.equal(1);
  });

  it('Should handle empty paths', () => {
    expect(get({}, ['', ''])).to.be.an('undefined');
    expect(get({ '': { '': 3 } }, [[], ['']])).to.equal(3);
  });

  it('Should convert types', () => {
    expect(get({ true: 3 }, true)).to.equal(3);
    expect(get({ false: 3 }, false)).to.equal(3);
    expect(get({ 54: 3 }, 54)).to.equal(3);
    expect(get({ 54: 3 }, '54')).to.equal(3);
    expect(get({ null: 3 }, null)).to.equal(3);
  });

  it('Should handle first `.` like empty key', () => {
    expect(get({ '': { user: 'First Name' } }, '.user')).to.equal('First Name');
  });

  it('Should return `undefined` when `object` is nullish', () => {
    const params = ['constructor', ['constructor']]
    params.forEach((path) => {
      expect(get(null, path)).to.be.an('undefined');
      expect(get(undefined, path)).to.be.an('undefined');
    });
  });

  it('Should return the default value for `undefined` values', () => {
    const object = { a: {} };
    const defaultValue = 'this is default value';

    expect(get(object, 'a.b', defaultValue)).to.equal(defaultValue);
    expect(get(object, ['a', 'b'], defaultValue)).to.equal(defaultValue);
    expect(get(null, 'a.b', defaultValue)).to.equal(defaultValue);
    expect(get(null, ['a', 'b'], defaultValue)).to.equal(defaultValue);
  });

  it('Should works with array', () => {
    const array = [1, 2, 3];
    const object = { a: array };
    const expected = 3;
    expect(get(object, 'a["2"]')).to.equal(expected);
    expect(get(object, 'a[2]')).to.equal(expected);
    expect(get(array, '[2]')).to.equal(expected);
    expect(get(array, '2')).to.equal(expected);
    expect(get(array, 2)).to.equal(expected);
  });
});
