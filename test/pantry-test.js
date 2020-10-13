const chai = require('chai');
const expect = chai.expect;

const Pantry = require('../src/pantry');

describe('Pantry', () => {
  let pantry;
  let pantryItems = [{
    "ingredient": 1,
    "amount": 3
  },
  {
    "ingredient": 2,
    "amount": 7
  }];

  beforeEach(() => {
    pantry = new Pantry();
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should create an instance of pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should contain an array of items', () => {
    expect(pantry.items).to.be.an('array');
  });

  
});
