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
    "amount": 2
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

  describe('Make Ingredients', () => {
    it('should store instances of Ingredient in ingredients array', () => {
      pantry.makeIngredients();

      expect(pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
      expect(pantry.ingredients[0].name).to.deep.equal('pumpkin');
    });

    it('should update the amount of each ingredient in the pantry', () => {
      pantry.makeIngredients();
      pantry.updateIngredientData(pantry.rawPantryData, 'amount');

      expect(pantry.ingredients[0].name).to.deep.equal('pumpkin');
      expect(pantry.ingredients[0].amount).to.deep.equal(3);
    });
  });

  describe('Check Stock For Recipe', () => {
    it('should check if there are enough ingredients to make a recipe', () => {
      pantry.makeIngredients();
      pantry.updateIngredientData(pantry.rawPantryData, 'amount');

      let result = pantry.checkStock(recipe);
      let result2 = pantry.checkStock(recipe2);

      expect(result).to.deep.equal(true);
      expect(result2).to.deep.equal(false);
    });
  });

    describe.skip('Return Shopping List', () => {
      it('should return ingredients needed to make a recipe', () => {
        pantry.makeIngredients();
        pantry.updateIngredientData(pantry.rawPantryData, 'amount');

        let result = pantry.returnIngredientsNeeded(recipe2);

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal('pasta: 1 box');
        expect(result[1]).to.deep.equal('tomato: 3 ');
        expect(result[2]).to.deep.equal(undefined);
      });

      it('should only show the amount needed on the shopping list', () => {
        pantry.makeIngredients();
        pantry.updateIngredientData(pantry.rawPantryData, 'amount');

        let result = pantry.returnIngredientsNeeded(recipe2);

        expect(result[0]).to.deep.equal('pasta: 1 box');
        expect(result[1]).to.deep.equal('tomato: 1 ');
    });
  });
});
