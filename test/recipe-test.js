const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe();
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('')

});
