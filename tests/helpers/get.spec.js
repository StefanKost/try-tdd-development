const chai = require('chai');
const { get } = require('../../helpers');

const { expect } = chai;

describe('Get helper', () => {
  it('Should be a function', () => {
    expect(get).to.be.a('function');
  });
});
