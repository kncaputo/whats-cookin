const Ingredient = require('../src/ingredient');
const IngredientsInventory = require('./ingredientInventory.js');

class Pantry {
  constructor(pantry, ingredientsData) {
    this.rawPantryData = pantry;
    this.ingredients = [];
    this.ingredientsNeeded = [];
    this.ingredientsInventory = new IngredientsInventory(ingredientsData);
  }

  extractValues(array, itemCriteria) {
    if (array !== undefined) {
      let allValues = array.reduce((values, item) => {
        values.push(item[itemCriteria]);
        return values;
      }, []);
      return allValues;
    }
  }

  makeIngredients() {
    this.ingredientsInventory.makeIngredients()
    this.ingredientsInventory.allIngredients.forEach(ingredient => {
      this.rawPantryData.forEach(pantryIngredient => {
        if (pantryIngredient.ingredient === ingredient.id) {
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

  checkStock(recipe) {
    let ingredientsInStock = [];
    let ingredientsNeeded = [];
    recipe.makeIngredients();
    recipe.updateIngredientData(recipe.rawRecipeIngredientData, 'quantity');
    recipe.ingredients.forEach(recipeIngredient => {
      this.ingredients.forEach(pantryIngredient => {
        if ((recipeIngredient.id === pantryIngredient.id) && (recipeIngredient.quantity.amount <= pantryIngredient.amount)) {
          ingredientsInStock.push(true);
        } else if (!this.ingredientsNeeded.includes(recipeIngredient)) {
          this.ingredientsNeeded.push(recipeIngredient);
        }
      });
    });

    if (ingredientsInStock.length === recipe.ingredients.length) {
       return true;
     } else {
       return false;
     }
  }

  returnIngredientsNeeded(recipe) {
    this.checkStock(recipe);
    return this.ingredientsNeeded;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
