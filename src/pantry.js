const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.items = pantry || [];
    this.ingredients = [];
  }

  makeIngredients(ingredientsData) {
    if (ingredientsData !== undefined) {
        let ingredientIds = this.items.reduce((ids, item) => {
        ids.push(item.ingredient);
        return ids;
      }, []);

      ingredientIds.forEach(id => {
        ingredientsData.filter(ingredient => {
          if (ingredient.id === id) {
            this.ingredients.push(new Ingredient(ingredient));
          }
        })
      })
    }
  }

  checkStock() {

  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
