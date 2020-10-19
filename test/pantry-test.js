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
    pantry = new Pantry(pantryItems, sampleIngredientsData);
    pantry2 = new Pantry(pantryItems2, sampleIngredientsData);
    recipe = new Recipe(pumpkinJuice, sampleIngredientsData);
    recipe2 = new Recipe(spaghetti, sampleIngredientsData);
  });

  describe('Constructor',() => {
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
  });

  describe('Making Ingredients', () => {
    it('should store instances of Ingredient in ingredients array', () => {
      pantry.makeIngredients();

      expect(pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
    });

  });

  describe.skip('Check Stock For Recipe', () => {
    it('should check if there are enough ingredients to make a recipe', () => {
      pantry.makeIngredients();

      expect(pantry.checkStock(pumpkinJuice, sampleIngredientsData)).to.deep.equal(true);
    });

    it('should put ingredients needed to make a recipe in an array', () => {
      pantry.makeIngredients();

      expect(pantry.checkStock(spaghetti, sampleIngredientsData)).to.deep.equal(false);
    });

  });

});
