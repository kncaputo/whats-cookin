const Ingredient = require('./ingredient.js');
const IngredientsInventory = require('./ingredientInventory.js');


class Recipe {
  constructor(recipe, rawIngredientsData) {
    this.id = recipe.id || null;
    this.image = recipe.image;
    this.rawRecipeIngredientData = recipe.ingredients;
    this.ingredients = []
    this.name = recipe.name;
    this.instructions = recipe.instructions;
    this.isFavorite = false;
    this.readyToCook = false;
    this.ingredientsInventory = new IngredientsInventory(rawIngredientsData);
  }

  getInstructions() {
    return this.instructions.reduce((instructions, step) => {
      instructions.push(`${step.number}. ${step.instruction}`);
      return instructions;
    }, []);
  }

  makeIngredients() {
    this.ingredientsInventory.makeIngredients()
    this.ingredientsInventory.allIngredients.forEach(ingredient => {
      this.rawRecipeIngredientData.forEach(recipeIngredient => {
        if (recipeIngredient.id === ingredient.id) {
          this.ingredients.push(ingredient);
        }
      })
    })
  }

  updateIngredientData(array, key) {
    this.ingredients.forEach(ingredient => {
      this.ingredientsInventory.updateIngredientData(array, key);
    });
  }


  calculateCost() {
    let totalCost = 0;
    this.ingredients.forEach(ingredient => {
      return totalCost += ingredient.estimatedCostInCents;
    })
    return totalCost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
