const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const IngredientInventory = require('../src/ingredientInventory');
const Recipe = require('../src/recipe');
const RecipeBox = require('../src/recipeBox');
const Pantry = require('../src/pantry');
const User = require('../src/user');

describe('User', () => {
  let user;
  let bob = {"name": "Bob",
  "id": 1,
  "pantry": [
    {
      "ingredient": 1,
      "amount": 2
    },
    {
      "ingredient": 5,
      "amount": 4
    },
    {
      "ingredient": 3,
      "amount": 10
    },
    {
      "ingredient": 666,
      "amount": 9
    }]
  };

  let sampleIngredientsData = [{
    "id": 1,
    "name": "cheese",
    "estimatedCostInCents": 472
  },
  {
    "id": 2,
    "name": "watermelon",
    "estimatedCostInCents": 902
  },
  {
    "id": 3,
    "name": "tortilla",
    "estimatedCostInCents": 430
  },
  {
    "id": 4,
    "name": "beans",
    "estimatedCostInCents": 530
  },
  {
    "id": 5,
    "name": "salt",
    "estimatedCostInCents": 320
  },
{
  "id": 666,
  "name": "watermelon",
  "estimatedCostInCents": 320
},
{
  "id": 777,
  "name": "salt",
  "estimatedCostInCents": 120
}];

  let sampleRecipeData = [
    {
      id: 12,
      image: 'https://exampleimage.com/1/1/1',
      ingredients: [{
      "id": 1,
      "quantity": {
        "amount": 0.75,
        "unit": "cup"
      }
      },
      {
        "id": 3,
        "quantity": {
          "amount": 1,
          "unit": "tortilla"
        }
      },
      {
        "id": 4,
        "quantity": {
          "amount": 0.5,
          "unit": "cup"
        }
      }],
      name: 'Burrito',
      instructions: [{
        "instruction": "Gather ingredients.",
        "number": 1
      },
      {
        "instruction": "Cook them.",
        "number": 2
      }],
      "tags": [
        "lunch",
        "side dish",
        "appetizer"
      ]
    },
    {
      id: 13,
      image: 'https://exampleimage.com/1/1/1',
      ingredients: [{
      "id": 1,
      "quantity": {
        "amount": 0.75,
        "unit": "cup"
      }
      },
      {
        "id": 3,
        "quantity": {
          "amount": 1,
          "unit": "tortilla"
        }
      }],
      name: 'Cheese Quesadilla',
      instructions: [{
        "instruction": "Put cheese on tortilla.",
        "number": 1
      },
      {
        "instruction": "Fry in pan",
        "number": 2
      }],
      "tags": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ]
    },
    {
      id: 123,
      image: 'https://exampleimage.com/1/1/1',
      ingredients: [{
        "id": 666,
        "quantity": {
          "amount": 1,
          "unit": "c"
        }
      },
      {
        "id": 777,
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
      }],
      tags: [
        "snack",
        "drink",
      ]
    }
  ];

  beforeEach(() => {
    user = new User(bob, sampleIngredientsData, sampleRecipeData);
    user.start();
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(User).to.be.a('function');
    });

    it('should create an instance of User', () => {
      expect(user).to.be.an.instanceof(User);
    });

    it('should have an id', () => {
      expect(user.id).to.deep.equal(1);
    });

    it('should have a name', () => {
      expect(user.name).to.deep.equal('Bob');
    });

    it('should have a pantry', () => {
      expect(user.pantry).to.be.an.instanceof(Pantry);
    });

    it('should have a recipe box', () => {
      expect(user.recipeBox).to.be.an.instanceof(RecipeBox);
    });
  });

  describe('Start', () => {
    it('should make ingredients with pantry', () => {
      expect(user.pantry.ingredientInventory).to.be.an.instanceof(IngredientInventory);
      expect(user.pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
    });

    it('should make recipes with recipeBox', () => {
      expect(user.recipeBox.allRecipes[1]).to.be.an.instanceof(Recipe);
    });

    it('should make ingredients and an inventory for every recipe', () => {
      expect(user.recipeBox.allRecipes[0].ingredientInventory).to.be.an.instanceof(IngredientInventory);
      expect(user.recipeBox.allRecipes[0].ingredients[0]).to.be.an.instanceof(Ingredient);
    });

    it('should update amount value for a pantry ingredient', () => {
      const result = user.pantry.ingredients[0];

      expect(result.amount).to.deep.equal(2);
      expect(result.name).to.deep.equal('cheese');
    });

    it('should update quantity value for a recipe ingredient', () => {
      const result = user.recipeBox.allRecipes[0].ingredients[0];

      expect(result.quantity.amount).to.deep.equal(0.75);
      expect(result.quantity.unit).to.deep.equal("cup");
      expect(result.name).to.deep.equal("cheese");
    });
  })

  describe('Search Recipes', () => {
    it('should be able to search recipes via input', () => {
      const result = user.searchRecipes('Cheese');

      expect(result.length).to.deep.equal(2);
      expect(result[0].name).to.deep.equal('Burrito');
      expect(result[1].name).to.deep.equal('Cheese Quesadilla');
    });

    it('should be able to search by ingredient', () => {
      const result = user.searchRecipes('waterMELON');

      expect(result.length).to.deep.equal(1);
      expect(result[0].name).to.deep.equal('Watermelon Juice');
    })
  });

  describe('Filter Recipes', () => {
    it('should be able to filter recipe by input', () => {

    expect(user.filterRecipeByType('side dish')).to.be.an('array');
    expect(user.filterRecipeByType('side dish').length).to.deep.equal(1);
    })
  });
});
