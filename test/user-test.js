const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');
const User = require('../src/user.js');

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User;
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should create an instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });
});
