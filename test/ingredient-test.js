const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');

describe('Ingredient', () => {
  let ingredient;
  let ingredient2;
  let recipe;
  let pantry;

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

  let pumpkinJuice = {id: 123, image: 'https://exampleimage.com/1/1/1', ingredients: [{
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

  let pantryItems = [{
    "ingredient": 1,
    "amount": 3
  },
  {
    "ingredient": 2,
    "amount": 7
  }];

  beforeEach(() => {
    ingredient = new Ingredient(pumpkin);
    recipe = new Recipe(pumpkinJuice, sampleIngredientsData);
    pantry = new Pantry(pantryItems, sampleIngredientsData);
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

  // it('should return updated ingredient quantity for a recipe', () => {
  //   ingredient.updateIngredientData(recipe.ingredients, 'quantity');
  //   ingredient.updateIngredientData(recipe.ingredients, 'quantity');
  //
  //   expect(ingredient.quantity.amount).to.deep.equal(2);
  //   expect(ingredient.quantity.unit).to.deep.equal('c');
  //   expect(ingredient.name).to.deep.equal('pumpkin');
  // });
  //
  it('should return updated ingredient amount for a pantry', () => {
    pantry.makeIngredients();
    pantry.ingredients.forEach(ingredient => {
      ingredient.updateIngredientData(pantry.ingredients, 'amount', 'id');
      ingredient.updateIngredientData(pantry.ingredients, 'name', 'id');
      ingredient.updateIngredientData(pantry.ingredients, 'estimatedCostInCents', 'id');
    });

    expect(pantry.ingredients[0].name).to.deep.equal('pumpkin');
    expect(pantry.ingredients[0].amount).to.deep.equal(3);

    expect(pantry.ingredients[1].name).to.deep.equal('conch');
    expect(pantry.ingredients[1].amount).to.deep.equal(7);
  });
});
