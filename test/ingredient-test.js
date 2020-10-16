const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');

describe('Ingredient', () => {
  let ingredient;
  let ingredient2;
  let sugar = {id: 1, name: 'sugar', estimatedCostInCents: 250};
  let conch = {id: 2, name: 'conch', quantity: {
    "amount": 1,
    "unit": ""
  }};

  beforeEach(() => {
    ingredient = new Ingredient(sugar);
    ingredient2 = new Ingredient(conch);
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
    let lettuce = {id: 3, name: 'lettuce', estimatedCostInCents: 125};
    let ingredient3 = new Ingredient(lettuce);

    expect(ingredient3.id).to.deep.equal(3);
    expect(ingredient3.name).to.deep.equal('lettuce');
    expect(ingredient3.cost).to.deep.equal(125);
  });

  it('should have a quantity object with an amount and unit when the ingredient is in recipe', () => {
    expect(ingredient2.quantity.amount).to.deep.equal(1);
    expect(ingredient2.quantity.unit).to.deep.equal('');
  });
});
