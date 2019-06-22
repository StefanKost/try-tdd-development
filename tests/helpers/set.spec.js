const { expect } = require('chai');
const { set } = require('../../helpers');

describe('Set handler', () => {
  it('Should be a function', () => {
    expect(set).to.be.an('function');
  });

  it('Should set property values', () => {
    const oldValue = 1;
    const value = 2;

    ['a', ['a']].forEach((path) => {
      const object = { a: oldValue };
      const actual = set(object, path, value);

      expect(actual).to.equal(object);
      expect(object).to.have.property('a', value);
    });
  });

  it('Should set deep property values', () => {
    const oldValue = 1;
    const value = 2;

    ['a.b', ['a', 'b']].forEach((path) => {
      const object = { a: { b: oldValue } };
      const actual = set(object, path, value);

      expect(actual).to.equal(object);
      expect(object).to.have.deep.equal({ a: { b: value } });
    });
  });

  it('Should set a key over a path', () => {
    const oldValue = 1;
    const value = 2;

    ['a.b', ['a.b']].forEach((path) => {
      const object = { 'a.b': oldValue };
      const actual = set(object, path, value);

      expect(actual).to.equal(object);
      expect(object).to.deep.equal({ 'a.b': value });
    });
  });

  it('Should not coerce array paths to strings', () => {
    const object = { 'a,b,c': 1, a: { b: { c: 1 } } };
    const value = 2;

    set(object, ['a', 'b', 'c'], value);
    expect(object.a.b.c).to.equal(value);
  });

  it('Should handle empty paths', () => {
    let object = {};
    const value = 2;

    set(object, [''], value);
    expect(object).to.deep.equal({ '': value });

    object = {};
    set(object, [], value);
    expect(object).to.deep.equal({});
  });

  it('Should create parts of `path` that are missing', () => {
    const value = 'new value';

    ['a[1].b.c', ['a', '1', 'b', 'c']].forEach((path) => {
      const object = {};
      const actual = set(object, path, value);

      expect(actual).to.equal(object);
      expect(actual).to.deep.equal({ a: [undefined, { b: { c: value } }] });
      expect(!('0' in object.a)).to.equal(true);
    });
  });

  it('Should overwrite primitives in the path', () => {
    const value = 2;

    ['a.b', ['a', 'b']].forEach((path) => {
      const object = { a: '' };

      set(object, path, value);

      expect(object).to.deep.equal({ a: { b: value } });
    });
  });

  it('Should not create an array for missing non-index property names that start with numbers', () => {
    const object = {};
    const value = 2;

    set(object, ['1a', '2b', '3c'], value);
    expect(object).to.deep.equal({ '1a': { '2b': { '3c': value } } });
  });

  it('Should not modify not object', () => {
    const number = 5;
    const value = 2;

    set(number, ['a.b'], value);
    expect(number).to.equal(5);
  });

  it('Set array', () => {
    const array = [1, 3];
    const value = 2;

    set(array, ['2'], value);
    expect(array).to.deep.equal([1, 3, 2]);
  });

  it('Should not use nullable values', () => {
    const nullable = null;
    const value = 2;

    set(nullable, ['2'], value);
    expect(nullable).to.equal(null);
  });
});
