const chai = require('chai');
const expect = chai.expect;

const Ingredient = require('../src/ingredient');
const Recipe = require('../src/recipe');

describe('Recipe', () => {
  let recipe;
  const sampleIngredientsData = [
    {
      "id": 1,
      "name": "pumpkin",
      "estimatedCostInCents": 660
    },
    {
      "id": 2,
      "name": "brown sugar",
      "estimatedCostInCents": 559
    },
    {
      "id": 3,
      "name": "watermelon",
      "estimatedCostInCents": 559
    },
    {
      "id": 4,
      "name": "salt",
      "estimatedCostInCents": 559
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

  let watermelonJuice = {id: 123, image: 'https://exampleimage.com/1/1/1', ingredients: [{
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
  }]};

  beforeEach(() => {
    recipe = new Recipe(pumpkinJuice, sampleIngredientsData);
    recipe2 = new Recipe(watermelonJuice, sampleIngredientsData);
  });

  describe('Constructor', () => {
    it('should be a function', () => {
      expect(Recipe).to.be.a('function');
    });

    it('should be an instance of recipe', () => {
      expect(recipe).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
      expect(recipe.id).to.deep.equal(123);
    });

    it('should have an image source', () => {
      expect(recipe.image).to.deep.equal('https://exampleimage.com/1/1/1');
    });

    it('should have a name', () => {
      expect(recipe.name).to.be.a('string');
      expect(recipe.name).to.deep.equal('Pumpkin Juice');
    });

    it('should contain an array of ingredients', () => {
      expect(recipe.ingredients).to.be.an('array');
    });

    it('should contain an array of instructions', () => {
      expect(recipe.instructions).to.be.an('array');
    });

    it('should indicate whether recipe is saved to favorites', () => {
      expect(recipe.isFavorite).to.deep.equal(false);
    });

    it('should indicate whether recipe is ready to cook', () => {
      expect(recipe.readyToCook).to.deep.equal(false);
    });
  })

  describe('Make Ingredients', () => {
    it('should replace ingredient objects with instances of Ingredient', () => {
      recipe.makeIngredients();

      expect(recipe.ingredients[0]).to.be.an.instanceof(Ingredient);
      expect(recipe.ingredients[0].name).to.deep.equal('pumpkin');
    })

    it('should have an id for each ingredient', () => {
      recipe.makeIngredients();
      expect(recipe.ingredients[0].id).to.deep.equal(1);
      expect(recipe.ingredients[1].id).to.deep.equal(2);
    });

    it('should update the quantity needed of each ingredient in the recipe', () => {
      recipe.makeIngredients();
      recipe.updateIngredientData(recipe.rawRecipeIngredientData, 'quantity');

      expect(recipe.ingredients[0].quantity.amount).to.deep.equal(2);
      expect(recipe.ingredients[0].quantity.unit).to.deep.equal('c');
    });
  })

  describe('Return Ingredients', () => {
    it('should be able to return an array of ingredients', () => {
      recipe.makeIngredients();
      let result = recipe.returnIngredients();

      expect(result[0]).to.deep.equal('pumpkin');
      expect(result[1]).to.deep.equal('brown sugar');
    });
  });

  describe('Return Instructions', () => {
    it('should be able to return an array of instructions', () => {
      let result = recipe.getInstructions();

      expect(result[0]).to.include('1. Get a cup.');
    });
  })

  describe('Calculate Cost', () => {
    it('should calculate the total cost of ingredients', () => {
      recipe.makeIngredients();
      let result = recipe.calculateCost();

      expect(result).to.deep.equal(1219);
    });

  });
});
