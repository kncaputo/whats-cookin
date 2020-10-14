const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Pantry = require('../src/pantry');

describe('Pantry', () => {
  let pantry;
  let pantryItems = [{
    "ingredient": 1,
    "amount": 3
  },
  {
    "ingredient": 2,
    "amount": 7
  }];

  let sampleIngredientsData = [{
    "id": 1,
    "name": "eggs",
    "estimatedCostInCents": 472
  },
  {
    "id": 2,
    "name": "sucrose",
    "estimatedCostInCents": 902
  },
  {
    "id": 3,
    "name": "bread",
    "estimatedCostInCents": 430
  }]

  beforeEach(() => {
    pantry = new Pantry(pantryItems);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should create an instance of pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should contain an array of items', () => {
    expect(pantry.items).to.be.an('array');
  });

  it('should create an instance of Ingredient', () => {
    pantry.makeIngredients(sampleIngredientsData);
    expect(pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
  });
});
