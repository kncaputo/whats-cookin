const IngredientInventory = require('./ingredientInventory.js');

class Pantry {
  constructor(pantry, ingredientsData) {
    this.rawPantryData = pantry;
    this.ingredients = [];
    this.ingredientsNeeded = [];
    this.ingredientInventory = new IngredientInventory(ingredientsData);
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
    this.updateIngredientData(this.rawPantryData, 'amount');
  }

  updateIngredientData(array, key) {
    this.ingredients.forEach(ingredient => {
      this.ingredientInventory.updateIngredientData(array, key);
    });
  }

  // checkStock(recipe) {
  //   let ingredientsInStock = [];
  //   this.ingredients.forEach(pantryIngredient => {
  //     recipe.ingredients.forEach(recipeIngredient => {
  //       if ((recipeIngredient.id === pantryIngredient.id) && (recipeIngredient.quantity.amount <= pantryIngredient.amount)) {
  //         ingredientsInStock.push(true);
  //       }
  //       // else if ((recipeIngredient.id === pantryIngredient.id) && (recipeIngredient.quantity.amount > pantryIngredient.amount)) {
  //       //   recipeIngredient.amountNeeded = recipeIngredient.quantity.amount - pantryIngredient.amount
  //       //   this.ingredientsNeeded.push(recipeIngredient);
  //       // } else {
  //       //   recipeIngredient.amountNeeded = recipeIngredient.quantity.amount
  //       //   this.ingredientsNeeded.push(recipeIngredient);
  //       // }
  //     });
  //   });

    if (ingredientsInStock.length === recipe.ingredients.length) {
       return true;
     } else {
       return false;
     }
  }

  returnIngredientsNeeded(recipe) {
    this.checkStock(recipe);
    let amountNeeded;
    console.log(this.ingredientsNeeded)
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
