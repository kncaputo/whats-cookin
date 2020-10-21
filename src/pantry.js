// const IngredientInventory = require('./ingredientInventory.js');

class Pantry {
  constructor(pantry, ingredientsData) {
    this.rawPantryData = pantry;
    this.ingredients = [];
    this.ingredientsNeeded = [];
    this.ingredientInventory = new IngredientInventory(ingredientsData);
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
    this.updateIngredientData(this.rawPantryData, 'amount');
  }

  updateIngredientData(array, key) {
    this.ingredients.forEach(ingredient => {
      this.ingredientInventory.updateIngredientData(array, key);
    });
  }

  checkStock(recipe) {
    let ingredientsInStock = [];
    this.ingredientsNeeded = [];
    recipe.ingredients.forEach(recipeIngredient => {
      this.ingredients.forEach(pantryIngredient => {
        if (recipeIngredient.id === pantryIngredient.id && !ingredientsInStock.includes(recipeIngredient)) {
          ingredientsInStock.push(recipeIngredient);
        } else if (recipeIngredient.id !== pantryIngredient.id && !this.ingredientsNeeded.includes(recipeIngredient)) {
          this.ingredientsNeeded.push(recipeIngredient);
        }
      })
    })
    return this.ingredientsNeeded;
  }

  parseShoppingList(recipe) {
    this.checkStock(recipe);
    if (this.ingredientsNeeded.length > 0) {
      return this.ingredientsNeeded.reduce((shoppingList, ingredient) => {
        console.log(ingredient)
        if (!shoppingList.includes(ingredient.name)) {
          shoppingList.push(`${ingredient.name}`);
        }
        return shoppingList;
        }, []);
    } else {
      return 'You have everything you need!'
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
}
