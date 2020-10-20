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
    this.isReadyToCook = false;
    this.ingredientsInventory = new IngredientsInventory(rawIngredientsData);
  }

  indicateList(location) {
    this[location] = !this[location]
  }

  getInstructions() {
    return this.instructions.reduce((instructions, step) => {
      instructions.push(`${step.number}. ${step.instruction}`);
      return instructions;
    }, []);
  }

  returnIngredients() {
    return this.ingredients.reduce((ingredients, ingredient) => {
      ingredients.push(`${ingredient.name}`);
      return ingredients;
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
