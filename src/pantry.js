const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.items = pantry || [];
    this.ingredients = [];
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
    if (ingredientsData !== undefined) {
      let ingredientIds = this.extractValues(this.items, 'ingredient');

      ingredientIds.forEach(id => {
        ingredientsData.filter(ingredient => {
          if (ingredient.id === id) {
            this.ingredients.push(new Ingredient(ingredient));
          }
        })
      })
    }
  }

  checkStock(recipe) {

    // take ids & amounts from recipe ingredients, push into new array objects
    // compare new array to this.items.id at each index
    // if pantry.items[i].amount >= recipe.ingredients[i].quantity.amount
  }
}


if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
