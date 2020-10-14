const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.ingredients = pantry || [];
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

  makeIngredients(ingredientsData) {
    let allIngredients = [];
    let ingredientIds = this.extractValues(this.ingredients, 'ingredient');
    let ingredientAmounts = this.extractValues(this.ingredients, 'amount');

    if (ingredientsData !== undefined) {
      ingredientIds.forEach(id => {
        ingredientsData.filter(ingredient => {
          if (ingredient.id === id) {
            allIngredients.push(new Ingredient(ingredient, null));
          }
        })
      })

      this.updateIngredientAmount(allIngredients);

      this.ingredients = allIngredients;
    }
  }

  updateIngredientAmount(pantry) {
    pantry.forEach(item => {
      this.ingredients.filter(ingredient => {
        if (ingredient.ingredient === item.id) {
          item.amount = ingredient.amount;
        }
      })
    })
  }

  checkStock(recipe) {
    let ingredientIds = this.extractValues(this.ingredients, 'id');
    let ingredientsInStock = []
    recipe.ingredients.forEach(item => {
      if (ingredientIds.includes(item.id)) {
        this.ingredients.filter(ingredient => {
          if ((ingredient.id === item.id) && (item.quantity.amount <= ingredient.amount)) {
            ingredientsInStock.push(true);
          }
        })
      }
    })
// ingredient.quantity.amount <=
    if (ingredientsInStock.length === recipe.ingredients.length) {
      // this.ingredients[i].amount VS. recipe.ingredients[i].quantity.amount
      // helper function to compare amounts
      return true;
    } else {
      return false;
    }
  }
}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
