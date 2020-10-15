const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');
const User = require('../src/user.js');

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
    "name": "chicken",
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

  beforeEach(() => {
    user = new User(bob);
    burrito = new Recipe(burrito);
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
    user.addRecipeToFavorites(burrito);

    expect(user.favoriteRecipes.length).to.deep.equal(1);
    expect(user.favoriteRecipes[0]).to.be.an.instanceof(Recipe);
  });

  it('should add a recipe to cook', () => {
    user.addRecipeToCook(burrito);

    expect(user.recipesToCook.length).to.deep.equal(1);
    expect(user.recipesToCook[0]).to.be.an.instanceof(Recipe);
    expect(user.recipesToCook[0].name).to.deep.equal('Burrito');
  });
});
