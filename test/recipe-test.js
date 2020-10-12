const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('Recipe', () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(123, 'https://exampleimage.com/1/1/1', 'Pumpkin Juice');
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have an id', () => {
    expect(recipe.id).to.deep.equal(123);
  });

  it('should have an image source', () => {
    expect(recipe.image).to.deep.equal('https://exampleimage.com/1/1/1');
  });

  it('should have a name', () => {
    expect(recipe.name).to.be.a('string');
    expect(recipe.name).to.deep.equal('Pumpkin Juice');
  });
});
