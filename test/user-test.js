const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
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
    }
    // , {
    //   id: 13,
    //   image: 'https://exampleimage.com/1/1/1',
    //   ingredients: [{
    //   "id": 1,
    //   "quantity": {
    //     "amount": 0.75,
    //     "unit": "cup"
    //   }
    //   },
    //   {
    //     "id": 3,
    //     "quantity": {
    //       "amount": 1,
    //       "unit": "tortilla"
    //     }
    //   }],
    //   name: 'Cheese Quesadilla',
    //   instructions: [{
    //     "instruction": "Put cheese on tortilla.",
    //     "number": 1
    //   },
    //   {
    //     "instruction": "Fry in pan",
    //     "number": 2
    //   }],
    //   "tags": [
    //     "lunch",
    //     "main course",
    //     "main dish",
    //     "dinner"
    //   ]
    // }
  ];

  beforeEach(() => {
    user = new User(bob, sampleIngredientsData, sampleRecipeData);
    // burrito = new Recipe(burrito, sampleIngredientsData);
    // cheeseQuesadilla = new Recipe(cheeseQuesadilla, sampleIngredientsData);
    // watermelonJuice = new Recipe(watermelonJuice, sampleIngredientsData);
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

  describe('Make Ingredients', () => {
    it('should have instances of Ingredients in the pantry', () => {
      user.pantry.makeIngredients();

      expect(user.pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
    });

    it('should have ingredients that match array in object passed as argument', () => {
      user.pantry.makeIngredients();

      expect(user.pantry.ingredients[0].name).to.deep.equal('cheese');
    });
  });

  describe('Add Recipe To List', () => {
    it('should add a recipe to favorites', () => {

    });

    it('should add a recipe to cook', () => {

    });

    it('should indicate that recipe has been favorited when added to favorite recipes', () => {

    });

    it('should indicate that recipe is ready to cook when added to recipes to cook', () => {

    });
  });

  describe('Remove Recipe From List', () => {
    it('should be able to remove recipe from favorites', () => {

    });

    it('should be able to remove recipe from recipes to cook', () => {

    });
  })

  describe('Search Recipes', () => {
    it('should be able to search recipes via input', () => {

    });
  });

  describe('Filter Recipes', () => {
    it('should be able to filter recipe by input', () => {

    user.recipeBox.makeRecipes();
    expect(user.filterRecipeByType('side dish')).to.be.an('array');
    expect(user.filterRecipeByType('side dish').length).to.deep.equal(1);
    })
  });

});
