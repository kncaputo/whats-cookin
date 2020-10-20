const Ingredient = require('../src/ingredient');
const IngredientsInventory = require('./ingredientInventory.js');

class Pantry {
  constructor(pantry, ingredientsData) {
    this.rawPantryData = pantry;
    this.ingredients = [];
    this.ingredientsNeeded = [];
    this.ingredientInventory = new IngredientsInventory(ingredientsData);
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
    this.ingredientInventory.makeIngredients()
    this.ingredientInventory.allIngredients.forEach(ingredient => {
      this.rawPantryData.forEach(pantryIngredient => {
        if (pantryIngredient.ingredient === ingredient.id) {
          this.ingredients.push(ingredient);
        }
      })
    })
  }

  updateIngredientData(array, key) {
    this.ingredients.forEach(ingredient => {
      this.ingredientInventory.updateIngredientData(array, key);
    });
  }

  checkStock(recipe) {
    let ingredientsInStock = [];
    recipe.makeIngredients();
    recipe.updateIngredientData(recipe.rawRecipeIngredientData, 'quantity');
    recipe.ingredients.forEach(recipeIngredient => {
      this.ingredients.forEach(pantryIngredient => {
        if ((recipeIngredient.id === pantryIngredient.id) && (recipeIngredient.quantity.amount <= pantryIngredient.amount)) {
          ingredientsInStock.push(true);
        } else {
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
    let amountNeeded;
    return this.ingredientsNeeded.reduce((shoppingList, recipeIngredient) => {
      this.ingredients.forEach(pantryIngredient => {

        if (recipeIngredient.name.includes(pantryIngredient.name)) {
          return amountNeeded = recipeIngredient.quantity.amount - pantryIngredient.amount;
        } else {
          return amountNeeded = recipeIngredient.quantity.amount;
        }
      })
      let ingredientNeeded = `${recipeIngredient.name}: ${amountNeeded} ${recipeIngredient.quantity.unit}`
      if (!shoppingList.includes(ingredientNeeded)) {
        shoppingList.push(ingredientNeeded);
      }
      return shoppingList;
    }, []);
  }

}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
