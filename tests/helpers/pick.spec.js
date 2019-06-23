const { expect } = require('chai');
const { pick } = require('../../helpers');

describe('pick helper', () => {
  it('Should be a function', () => {
    expect(pick).to.be.an('function');
  });

  it('Should flatten `paths`', () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    expect(pick(object, 'a', 'c')).to.deep.equal({ a: 1, c: 3 });
    expect(pick(object, ['a', 'd'], 'c')).to.deep.equal({ a: 1, c: 3, d: 4 });
  });

  it('Should support deep paths', () => {
    const object = { a: 1, b: { c: 2, d: 3 } };

    expect(pick(object, 'b.c')).to.deep.equal({ b: { c: 2 } });
  });

  it('Should support path arrays', () => {
    const object = { 'a.b': 1, a: { b: 2 } };
    const actual = pick(object, [['a.b']]);

    expect(actual).to.deep.equal({ 'a.b': 1 });
  });

  it('Should coerce `paths` to strings', () => {
    expect(pick({ 0: 'a', 1: 'b' }, 0)).to.deep.equal({ 0: 'a' });
  });

  it('Should return an empty object when `object` is nullish', () => {
    expect(pick(null, 'valueOf')).to.deep.equal({});
    expect(pick(undefined, 'valueOf')).to.deep.equal({});
  });

  it('Should return an empty object not found', () => {
    const object = { a: 1, b: { c: 2, d: 3 } };
    expect(pick(object, 'b.e')).to.deep.equal({});
  });
});
