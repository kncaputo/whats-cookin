const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');

describe('Ingredient', () => {
  let ingredient;
  let pumpkin = {id: 1, name: 'pumpkin', estimatedCostInCents: 250};

  let sampleIngredientsData = [{
    "id": 1,
    "name": "pumpkin",
    "estimatedCostInCents": 472
  },
  {
    "id": 2,
    "name": "conch",
    "estimatedCostInCents": 902
  },
  {
    "id": 3,
    "name": "bread",
    "estimatedCostInCents": 430
  },
  {
    "id": 4,
    "name": "pasta",
    "estimatedCostInCents": 530
  },
  {
    "id": 5,
    "name": "tomato",
    "estimatedCostInCents": 320
  }];

  beforeEach(() => {
    ingredient = new Ingredient(pumpkin);
  });

  describe('Constructor', () => {
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
      expect(ingredient.name).to.deep.equal('pumpkin');
    });

    it('should have a cost in cents', () => {
      expect(ingredient.estimatedCostInCents).to.deep.equal(250);
    });

    it('should be a different ingredient', () => {
      let lettuce = {id: 3, name: 'lettuce', estimatedCostInCents: 125};
      let ingredient2 = new Ingredient(lettuce);

      expect(ingredient2.id).to.deep.equal(3);
      expect(ingredient2.name).to.deep.equal('lettuce');
      expect(ingredient2.estimatedCostInCents).to.deep.equal(125);
    });
  });
});
