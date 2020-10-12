const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');

describe('Ingredient', () => {
  let sugar;

  beforeEach(() => {
    sugar = new Ingredient(1, 'sugar', 250);
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should create an instance of ingredient', () => {
    expect(sugar).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {
    expect(sugar.id).to.be.a('number');
    expect(sugar.id).to.deep.equal(1);
  });

  it('should have a name', () => {
    expect(sugar.name).to.deep.equal('sugar');
  });

  it('should have a cost in cents', () => {
    expect(sugar.cost).to.deep.equal(250);
  });

  it('should be a different ingredient', () => {
    let lettuce = new Ingredient(2, 'lettuce', 125);

    expect(lettuce.id).to.deep.equal(2);
    expect(lettuce.name).to.deep.equal('lettuce');
    expect(lettuce.cost).to.deep.equal(125);
  });
});
