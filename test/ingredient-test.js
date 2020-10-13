const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');

describe('Ingredient', () => {
  let ingredient;
  let sugar = {id: 1, name: 'sugar', cost: 250};

  beforeEach(() => {
    ingredient = new Ingredient(sugar);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should create an instance of ingredient', () => {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {
    expect(ingredient.id).to.be.a('number');
    expect(ingredient.id).to.deep.equal(1);
  });

  it('should have a name', () => {
    expect(ingredient.name).to.deep.equal('sugar');
  });

  it('should have a cost in cents', () => {
    expect(ingredient.cost).to.deep.equal(250);
  });

  it('should be a different ingredient', () => {
    let lettuce = {id: 2, name: 'lettuce', cost: 125};
    let ingredient2 = new Ingredient(lettuce)
    expect(ingredient2.id).to.deep.equal(2);
    expect(ingredient2.name).to.deep.equal('lettuce');
    expect(ingredient2.cost).to.deep.equal(125);
  });
});
