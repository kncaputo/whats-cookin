const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Pantry = require('../src/pantry');
const IngredientInventory = require('../src/ingredientInventory');

describe.only('IngredientInventory', () => {
  let ingredientInventory;
  let pantry;

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

  let samplePantryIngredients = [
    {
      "ingredient": 1,
      "amount": 12
    },
    {
      "ingredient": 2,
      "amount": 7
    },
    {
      "ingredient": 3,
      "amount": 10
    },
    {
      "ingredient": 4,
      "amount": 16
    },
    {
      "ingredient": 5,
      "amount": 8
    }]

    let sampleRecipeIngredients = [
      {
        "id": 1,
        "quantity": {
          "amount": 1.5,
          "unit": "c"
        }
      },
      {
        "id": 2,
        "quantity": {
          "amount": 0.5,
          "unit": "tsp"
        }
      },
      {
        "id": 3,
        "quantity": {
          "amount": 15,
          "unit": "large"
        }
      }]

  beforeEach(() => {
    ingredientInventory = new IngredientInventory(sampleIngredientsData);
    pantry = new Pantry(samplePantryIngredients, sampleIngredientsData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(IngredientInventory).to.be.a('function');
    });

    it('should pass data into rawIngredientsData', () => {
      expect(ingredientInventory.rawIngredientsData).to.deep.equal(sampleIngredientsData);
    });

    it('should start with no foundIngredient', () => {
      expect(ingredientInventory.foundIngredient).to.deep.equal(null);
    });
  });

  describe('Making Ingredients', () => {
    it('should create ingredients from data', () => {
      ingredientInventory.makeIngredients();
      expect(ingredientInventory.allIngredients[0]).to.be.an.instanceof(Ingredient);
    });

    it('should update the ingredient amount', () => {
      ingredientInventory.makeIngredients();
      ingredientInventory.updateIngredientData(samplePantryIngredients, 'amount', 'id');

      expect(ingredientInventory.allIngredients[0].amount).to.deep.equal(12);
    });
  });

  describe('Finding Ingredients', () => {
    it('should be able to find an ingredient based on an integer id', () => {
      ingredientInventory.makeIngredients();
      ingredientInventory.findIngredient(1)

      expect(ingredientInventory.foundIngredient.name).to.deep.equal('pumpkin');
      expect(ingredientInventory.foundIngredient.id).to.deep.equal(1);
      expect(ingredientInventory.foundIngredient.estimatedCostInCents).to.deep.equal(472);
    });

    it('should be able to find another ingredient based on an integer id', () => {
      ingredientInventory.makeIngredients();
      ingredientInventory.findIngredient(4)

      expect(ingredientInventory.foundIngredient.name).to.deep.equal('pasta');
      expect(ingredientInventory.foundIngredient.id).to.deep.equal(4);
      expect(ingredientInventory.foundIngredient.estimatedCostInCents).to.deep.equal(530);
    });
  });

});
