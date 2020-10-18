const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('RecipeBox', () => {
  let recipeBox;

  beforeEach(() => {
    recipeBox = new RecipeBox()
  });

  it('should be a function', () => {
    expect(RecipeBox).to.be.a('function');
  });
});
