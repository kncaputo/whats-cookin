const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.items = pantry || [];
    this.ingredients = [];
  }

  extractIngredientIds(data, array) {
  //   if (array !== undefined) {
  //     let allIds = array.reduce((ids, item) => {
  //       ids.push(item.ingredient || item.id);
  //       return ids;
  //     }, []);
  //   }
  // }

  makeIngredients(ingredientsData) {
    if (ingredientsData !== undefined) {
    //     let ingredientIds = this.items.reduce((ids, item) => {
    //     ids.push(item.ingredient);
    //     return ids;
    //   }, []);
      let ingredientIds = this.extractIds(ingredientsData);

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
