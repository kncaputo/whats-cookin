const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');
const User = require('../src/user.js');

describe.skip('User', () => {
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

  let burrito = {
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
    }]};

    let cheeseQuesadilla = {
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
      }]};

      let watermelonJuice = {
        id: 14,
        image: 'https://exampleimage.com/1/1/1',
        ingredients: [{
        "id": 1,
        "quantity": {
          "amount": 1,
          "unit": "cup"
        }
        },
        {
          "id": 5,
          "quantity": {
            "amount": 1,
            "unit": "pinch"
          }
        }],
        name: 'Watermelon Juice',
        instructions: [{
          "instruction": "Blend watermelon.",
          "number": 1
        },
        {
          "instruction": "Add a pinch of salt.",
          "number": 2
        }]};

  beforeEach(() => {
    user = new User(bob, sampleIngredientsData);
    burrito = new Recipe(burrito, sampleIngredientsData);
    cheeseQuesadilla = new Recipe(cheeseQuesadilla, sampleIngredientsData);
    watermelonJuice = new Recipe(watermelonJuice, sampleIngredientsData);
  });

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

  it('should have instances of Ingredients in the pantry', () => {
    user.pantry.makeIngredients(sampleIngredientsData);

    expect(user.pantry.ingredients[0]).to.be.an.instanceof(Ingredient);
  });

  it('should have ingredients that match array in object passed as argument', () => {
    user.pantry.makeIngredients(sampleIngredientsData);

    expect(user.pantry.ingredients[0].name).to.deep.equal('cheese');
  });

  it('should start with an empty array of favorite recipes', () => {
    expect(user.favoriteRecipes).to.be.an('array');
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should start with an empty array of recipes to cook', () => {
    expect(user.recipesToCook).to.be.an('array');
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should add a recipe to favorites', () => {
    user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', burrito);

    expect(user.favoriteRecipes.length).to.deep.equal(1);
    expect(user.favoriteRecipes[0]).to.be.an.instanceof(Recipe);
  });

  it('should add a recipe to cook', () => {
    user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', burrito);

    expect(user.recipesToCook.length).to.deep.equal(1);
    expect(user.recipesToCook[0]).to.be.an.instanceof(Recipe);
    expect(user.recipesToCook[0].name).to.deep.equal('Burrito');
  });

  it.skip('should be able to search recipes via input', () => {
    user.toggleRecipeStatus(user.recipesToCook, burrito);
    user.toggleRecipeStatus(user.recipesToCook, cheeseQuesadilla);
    user.toggleRecipeStatus(user.recipesToCook, watermelonJuice);

    let results = user.searchRecipes('cheese', user.recipesToCook);

    expect(results[0].name).to.deep.equal('Burrito');
    expect(results[1].name).to.deep.equal('Cheese Quesadilla');
  });

  it('should indicate that recipe has been favorited when added to favorite recipes', () => {
    user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', burrito);

    expect(user.favoriteRecipes[0].isFavorite).to.deep.equal(true);
  });

  it('should indicate that recipe is ready to cook when added to recipes to cook', () => {
    user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', burrito);

    expect(user.recipesToCook[0].readyToCook).to.deep.equal(true);
  });

  it('should be able to remove recipe from favorites', () => {
    user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', burrito);
    expect(user.favoriteRecipes[0].isFavorite).to.deep.equal(true);
    user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', burrito);

    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should be able to remove recipe from recipes to cook', () => {
    user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', burrito);
    expect(user.recipesToCook[0].readyToCook).to.deep.equal(true);
    user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', burrito);

    expect(user.recipesToCook).to.deep.equal([]);
  });
});
