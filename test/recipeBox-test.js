const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');
const RecipeBox = require('../src/recipeBox');

describe('RecipeBox', () => {
  let recipeBox;

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

  let sampleRecipeData = [{
    id: 7,
    image: 'https://exampleimage.com/1/1/7',
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
      id: 5,
      image: 'https://exampleimage.com/1/1/5',
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
      }]},
      {
        id: 9,
        image: 'https://exampleimage.com/1/1/9',
        ingredients: [{
        "id": 333,
        "quantity": {
          "amount": 1,
          "unit": ""
        }
        },
        {
          "id": 3,
          "quantity": {
            "amount": 5,
            "unit": "slices"
          }
        }],
        name: 'Pumpkin Bread',
        instructions: [{
          "instruction": "Combine pumpkin & bread.",
          "number": 1
        },
        {
          "instruction": "Bake.",
          "number": 2
        }]}
    ];

  beforeEach(() => {
    recipeBox = new RecipeBox(sampleRecipeData)
  });

  it('should be a function', () => {
    expect(RecipeBox).to.be.a('function');
  });

  it('should create an instance of a recipe box', () => {
    expect(recipeBox).to.be.an.instanceof(RecipeBox);
  });

  it('should have all recipes in an array', () => {
    expect(recipeBox.allRecipes).to.be.an('array');
    expect(recipeBox.allRecipes[0].name).to.deep.equal('Pumpkin Juice');
  });

  it('should be able to make recipes', () => {
    recipeBox.makeRecipes(sampleRecipeData);
    expect(recipeBox.allRecipes[0]).to.be.an.instanceof(Recipe);
    expect(recipeBox.allRecipes[1]).to.be.an.instanceof(Recipe);
    expect(recipeBox.allRecipes[2]).to.be.an.instanceof(Recipe);
  });

  it('should make ingredients in each recipe', () => {
    recipeBox.makeRecipes(sampleRecipeData);
    recipeBox.makeIngredients(sampleIngredientsData);

    expect(recipeBox.allRecipes[0].ingredients[0]).to.be.an.instanceof(Ingredient);
  });
});
