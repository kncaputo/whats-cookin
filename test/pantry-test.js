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

  let pantryItems2 = [{
    "ingredient": 444,
    "amount": 3
  },
  {
    "ingredient": 3,
    "amount": 7
  },
  {
    "ingredient": 1,
    "amount": 10
  }];

  let sampleIngredientsData = [{
    "id": 1,
    "name": "pumpkin",
    "estimatedCostInCents": 472
  },
  {
    "id": 2,
    "name": "sugar",
    "estimatedCostInCents": 902
  },
  {
    "id": 3,
    "name": "bread",
    "estimatedCostInCents": 430
  },
  {
    "id": 333,
    "name": "pasta",
    "estimatedCostInCents": 530
  },
  {
    "id": 444,
    "name": "tomato",
    "estimatedCostInCents": 320
  }];

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

    let spaghetti = {
      id: 12,
      image: 'https://exampleimage.com/1/1/1',
      ingredients: [{
      "id": 333,
      "quantity": {
        "amount": 1,
        "unit": "box"
      }
      },
      {
        "id": 444,
        "quantity": {
          "amount": 3,
          "unit": ""
        }
      }],
      name: 'Spaghetti',
      instructions: [{
        "instruction": "Cook pasta.",
        "number": 1
      },
      {
        "instruction": "Cover pasta in sauce.",
        "number": 2
      }]};

  beforeEach(() => {
    pantry = new Pantry(pantryItems);
    pantry2 = new Pantry(pantryItems2);
    recipe = new Recipe(pumpkinJuice);
    recipe2 = new Recipe(spaghetti);
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

  it('should contain an empty array of ingredients needed', () => {
    expect(pantry.ingredientsNeeded).to.deep.equal([]);
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

    // expect(pantry.ingredients[0].id).to.deep.equal(1);
    // expect(pantry.ingredients[0].name).to.deep.equal('pumpkin');
    // expect(pantry.ingredients[0].estimatedCostInCents).to.deep.equal(472);

    expect(pantry.ingredients[1].id).to.deep.equal(2);
    expect(pantry.ingredients[1].name).to.deep.equal('sugar');
    expect(pantry.ingredients[1].estimatedCostInCents).to.deep.equal(902);
  });

  it('should not make ingredients when no data is provided', () => {
    pantry.makeIngredients();

    expect(pantry.ingredients[0]).to.not.be.an.instanceof(Ingredient);
  });

  it('should add the correct amount to each ingredient', () => {
    pantry.makeIngredients(sampleIngredientsData);

    expect(pantry.ingredients[0].amount).to.deep.equal(3);
    expect(pantry.ingredients[1].amount).to.deep.equal(7);
  });

  it('should check if there are enough ingredients to make a recipe', () => {
    pantry.makeIngredients(sampleIngredientsData);

    expect(pantry.checkStock(pumpkinJuice, sampleIngredientsData)).to.deep.equal(true);
  });

  it('should put ingredients needed to make a recipe in an array', () => {
    pantry.makeIngredients(sampleIngredientsData);

    expect(pantry.checkStock(spaghetti, sampleIngredientsData)).to.deep.equal(false);
  });

  it.skip('should update ingredients not in pantry needed for a recipe', () => {
    pantry.makeIngredients(sampleIngredientsData);
    expect(pantry.checkStock(spaghetti, sampleIngredientsData)).to.deep.equal(false);
    // pantry.makeIngredientsNeeded(sampleIngredientsData, spaghetti);

    expect(pantry.ingredientsNeeded[0].name).to.deep.equal('pasta');
    expect(pantry.ingredientsNeeded[0].id).to.deep.equal(333);
    expect(pantry.ingredientsNeeded[0].amount).to.deep.equal(1);
    expect(pantry.ingredientsNeeded[0]).to.be.an.instanceof(Ingredient);
  });

});
