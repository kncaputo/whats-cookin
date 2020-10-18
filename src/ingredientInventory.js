// const Ingredient = require('./ingredient');

class IngredientsInventory {
  constructor(rawIngredientsData) {
    this.allIngredients = [];
    this.rawIngredientsData = rawIngredientsData;
  }

  makeIngredients() {
    debugger
    if (this.rawIngredientsData !== undefined) {
      this.rawIngredientsData.forEach(ingredient => {
        this.allIngredients.push(new Ingredient(ingredient));
      })
    }
  }

  findIngredient(id) {
    let foundIngredient = this.allIngredients.find(ingredient => {
      return ingredient.id === id;
    })
    return foundIngredient;
  }
}


if (typeof module !== 'undefined') {
  module.exports = IngredientsInventory;
};
