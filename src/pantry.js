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

  checkStock(recipe, ingredientsData) {
    let ingredientIds = this.extractValues(this.ingredients, 'id');
    let ingredientsInStock = [];
    let ingredientsNeeded = [];
    recipe.ingredients.forEach(recipeIngredient => {
      if (ingredientIds.includes(recipeIngredient.id)) {
        this.ingredients.filter(pantryIngredient => {
          if ((pantryIngredient.id === recipeIngredient.id) && (recipeIngredient.quantity.amount <= pantryIngredient.amount)) {
            ingredientsInStock.push(true);
          }
        })
      } else {
          ingredientsNeeded.push(recipeIngredient);
      }
    })
    this.makeIngredientsNeeded(ingredientsData, ingredientsNeeded);

    if (ingredientsInStock.length === recipe.ingredients.length) {
      return true;
    } else {
      return false;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
