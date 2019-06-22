const { expect } = require('chai');
const { toString } = require('../../helpers');

describe('toString helper', () => {
  it('should be a function', () => {
    expect(toString).to.be.an('function');
  });

  it('should convert nullable values to empty string', () => {
    expect(toString(null)).to.equal('');
    expect(toString(undefined)).to.equal('');
  });

  it('should return same string value', () => {
    expect(toString('')).to.equal('');
    expect(toString('hello world ')).to.equal('hello world ');
    expect(toString('\n\n\n')).to.equal('\n\n\n');
  });

  it('should convert array items separate by comma', () => {
    expect(toString([1, 2, 3])).to.equal('1,2,3');
    expect(toString([])).to.equal('');
    expect(toString(['test', 1, true, null])).to.equal('test,1,true,');
  });

  it('should convert bool types', () => {
    expect(toString(true)).to.equal('true');
    expect(toString(false)).to.equal('false');
  });

  it('should convert numeric values', () => {
    expect(toString(1)).to.equal('1');
    expect(toString(-1)).to.equal('-1');
    expect(toString(1.253)).to.equal('1.253');
  });

  it('should convert objects', () => {
    expect(toString({ i: '43' })).to.equal('{"i":"43"}');
    expect(toString({})).to.equal('{}');
  });
});
