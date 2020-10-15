const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');
const User = require('../src/user.js');

describe('User', () => {
  let user;
  let bob = {"name": "Bob",
  "id": 1,
  "pantry": [
    {
      "ingredient": 1,
      "amount": 2
    },
    {
      "ingredient": 2,
      "amount": 4
    },
    {
      "ingredient": 3,
      "amount": 10
    }]
  };

  beforeEach(() => {
    user = new User(bob);
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should create an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', () => {
    expect(user.id).to.deep.equal(1);
  });

  it('should have a name', () => {
    expect(user.name).to.deep.equal('Bob');
  });

  it('should have a pantry', () => {
    expect(user.pantry).to.be.an.instanceof(Pantry);
  });
});
