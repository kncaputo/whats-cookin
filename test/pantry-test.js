const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');

describe('Pantry', () => {
  let pantry;
  let recipe;
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

  let pumpkinJuice = {
    id: 123,
    image: 'https://exampleimage.com/1/1/1',
    ingredients: [{
    "id": 1,
    "quantity": {
      "amount": 2,
      "unit": "c"
    }
    },
    {
      "id": 2,
      "quantity": {
        "amount": 1.5,
        "unit": "tsp"
      }
    }],
    name: 'Pumpkin Juice',
    instructions: [{
      "instruction": "Get a cup.",
      "number": 1
    },
    {
      "instruction": "Put in smashed pumpkin.",
      "number": 2
    }]};

  beforeEach(() => {
    pantry = new Pantry(pantryItems);
    recipe = new Recipe(pumpkinJuice);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should create an instance of pantry', () => {
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should contain an array of ingredients', () => {
    expect(pantry.ingredients).to.be.an('array');
  });

  it('should default to empty array if no pantry is passed in', () => {
    let pantry2 = new Pantry();

    expect(pantry2.ingredients).to.deep.equal([]);
  });

  it('should store instances of Ingredient in ingredients array', () => {
    pantry.makeIngredients(sampleIngredientsData);

    expect(pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should create ingredients with an id, name and cost', () => {
    pantry.makeIngredients(sampleIngredientsData);

    expect(pantry.ingredients[0].id).to.deep.equal(1);
    expect(pantry.ingredients[0].name).to.deep.equal('eggs');
    expect(pantry.ingredients[0].cost).to.deep.equal(472);
  });

  it('should not make ingredients when no data is provided', () => {
    pantry.makeIngredients();

    expect(pantry.ingredients[0]).to.not.be.an.instanceof(Ingredient);
  });

  it('should check if pantry has enough ingredients to make a recipe', () => {

  });
});
