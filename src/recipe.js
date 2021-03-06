// const IngredientInventory = require('./ingredientInventory.js');

class Recipe {
  constructor(recipe, rawIngredientsData) {
    this.id = recipe.id || null;
    this.image = recipe.image;
    this.rawRecipeIngredientData = recipe.ingredients;
    this.ingredients = []
    this.name = recipe.name;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.isFavorite = false;
    this.isReadyToCook = false;
    this.ingredientInventory = new IngredientInventory(rawIngredientsData);
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
      ingredient.name = ingredient.name.toLowerCase();
      ingredient.quantity.unit = ingredient.quantity.unit.toLowerCase();
      let recipeIngredientString = ` ${ingredient.name} [ ${ingredient.quantity.amount.toFixed(2)} ${ingredient.quantity.unit}]`
        if (!ingredients.includes(recipeIngredientString)) {
          ingredients.push(recipeIngredientString);
        }
      return ingredients;
    }, []);
  }

  makeIngredients() {
    this.ingredientInventory.makeIngredients();
    this.ingredientInventory.allIngredients.forEach(ingredient => {
      this.rawRecipeIngredientData.forEach(recipeIngredient => {
        if (recipeIngredient.id === ingredient.id && ingredient.quantity !== null) {
          this.ingredients.push(ingredient);
        }
      })
    })
    this.ingredientInventory.updateIngredientData(this.rawRecipeIngredientData, 'quantity')
  }

  updateIngredientData(array, key) {
    this.ingredients.forEach(ingredient => {
      this.ingredientInventory.updateIngredientData(array, key);
    });
  }


  calculateCost() {
    let totalCost = 0;
    this.ingredients.forEach(ingredient => {
      return totalCost += ingredient.estimatedCostInCents;
    })
    return `$${totalCost / 100}`;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
