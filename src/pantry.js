const IngredientInventory = require('./ingredientInventory.js');

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

    console.log("recipe.ingredients" + recipe.ingredients[0].name);
    console.log("this.ingredients " + this.ingredients[2].name)
    // first loop iterates over recipe ingredients
    recipe.ingredients.forEach(recipeIngredient => {
      //second loop
      this.ingredients.forEach(pantryIngredient => {
        if (recipeIngredient.id === pantryIngredient.id && !ingredientsInStock.includes(recipeIngredient)) {
          ingredientsInStock.push(recipeIngredient)
        } else if (recipeIngredient.id !== pantryIngredient.id && !this.ingredientsNeeded.includes(recipeIngredient)) {
          this.ingredientsNeeded.push(recipeIngredient)
        }
      })
    })

    return this.ingredientsNeeded;
  }

  returnIngredientsNeeded(recipe) {
    this.checkStock(recipe)
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
