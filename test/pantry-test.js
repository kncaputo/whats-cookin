const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const IngredientInventory = require('../src/ingredientInventory');
const RecipeBox = require('../src/recipeBox');
const Pantry = require('../src/pantry');

describe.skip('Pantry', () => {
  let pantry;
  let recipeBox;
  let pantryItems = [{
    "ingredient": 1,
    // pumpkin
    "amount": 3
  },
  {
    "ingredient": 2,
    // sugar
    "amount": 7
  }];

  let pantryItems2 = [{
    "ingredient": 5,
    // tomato
    "amount": 2
  },
  {
    "ingredient": 3,
    // bread
    "amount": 7
  },
  {
    "ingredient": 1,
    // pumpkin
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
    "id": 4,
    "name": "pasta",
    "estimatedCostInCents": 530
  },
  {
    "id": 5,
    "name": "tomato",
    "estimatedCostInCents": 320
  }];

  const sampleRecipeData = [
  {
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
  }]},
  {
    id: 123,
    image: 'https://exampleimage.com/1/1/1',
    ingredients: [{
      "id": 3,
      "quantity": {
        "amount": 1,
        "unit": "c"
      }
    },
    {
      "id": 4,
      "quantity": {
        "amount": 1.5,
        "unit": "tsp"
      }
    }],
    name: 'Watermelon Juice',
    instructions: [{
      "instruction": "Get a cup.",
      "number": 1
    },
    {
      "instruction": "Put in smashed watermelon.",
      "number": 2
    }]
  },
  {
    id: 12,
    image: 'https://exampleimage.com/1/1/1',
    ingredients: [{
    "id": 4,
    "quantity": {
      "amount": 1,
      "unit": "box"
    }
    },
    {
      "id": 5,
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
    }
  ]}
  ];

  beforeEach(() => {
    pantry = new Pantry(pantryItems, sampleIngredientsData);
    pantry2 = new Pantry(pantryItems2, sampleIngredientsData);
    recipeBox = new RecipeBox(sampleRecipeData, sampleIngredientsData);
    recipeBox.makeRecipes();
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

    it('should have an ingredient inventory', () => {
      expect(pantry.ingredientInventory).to.be.an.instanceof(IngredientInventory)
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

      let result = pantry.checkStock(recipeBox.allRecipes[0]);
      let result2 = pantry.checkStock(recipeBox.allRecipes[1]);

      expect(result).to.deep.equal(true);
      expect(result2).to.deep.equal(false);
    });
  });

    describe('Return Shopping List', () => {
      it('should return ingredients needed to make a recipe', () => {
        pantry.makeIngredients();

        let result = pantry.returnIngredientsNeeded(recipeBox.allRecipes[1]);

        expect(result).to.be.an('array');
        expect(result[0]).to.deep.equal('pasta: 1 box');
        expect(result[1]).to.deep.equal('tomato: 3 ');
        expect(result[2]).to.deep.equal(undefined);
      });

      // 3 tomatoes in recipe
      // we have 2 in our pantry
      // we dont have pasta in our pantry
      // this.Ingredients Needed = recipe ingredient w/ quantity
      // this.ingredients = pantry w/ amount #

      it('should only show the amount needed on the shopping list', () => {
        pantry2.makeIngredients();

        let result = pantry2.returnIngredientsNeeded(recipeBox.allRecipes[1]);

        expect(result[0]).to.deep.equal('pasta: 1 box');
        expect(result[1]).to.deep.equal('tomato: 1 ');
    });
  });
});
