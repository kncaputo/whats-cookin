const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const IngredientsInventory = require('../src/ingredientInventory');

describe('IngredientsInventory', () => {
  let ingredientsInventory;

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
    ingredientsInventory = new IngredientsInventory(sampleIngredientsData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(IngredientsInventory).to.be.a('function');
    });

    it('should pass data into all ingredients', () => {
      expect(ingredientsInventory.allIngredients).to.deep.equal(sampleIngredientsData);
    });
  });

  describe('makeIngredients', () => {
    it('should create ingredients from data', () => {
      ingredientsInventory.makeIngredients();
      expect(ingredientsInventory.allIngredients[0]).to.be.an.instanceof(Ingredient);
    });
  });

  describe('findIngredient', () => {
    it('should be able to find an ingredient based on an integer id', () => {
      let result = ingredientsInventory.findIngredient(1)

      expect(result.name).to.deep.equal('pumpkin');
      expect(result.id).to.deep.equal(1);
      expect(result.estimatedCostInCents).to.deep.equal(472);
    });

    it('should be able to find another ingredient based on an integer id', () => {
      let result = ingredientsInventory.findIngredient(4)

      expect(result.name).to.deep.equal('pasta');
      expect(result.id).to.deep.equal(4);
      expect(result.estimatedCostInCents).to.deep.equal(530);
    });
  });

});
