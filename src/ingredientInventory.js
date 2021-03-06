// const Ingredient = require('./ingredient');

class IngredientInventory {
  constructor(rawIngredientsData) {
    this.allIngredients = [];
    this.rawIngredientsData = rawIngredientsData;
    this.foundIngredient = null;
  }

  makeIngredients() {
    if (this.rawIngredientsData !== undefined) {
      this.rawIngredientsData.forEach(ingredient => {
        if (ingredient !== null) {
          this.allIngredients.push(new Ingredient(ingredient));
        }
      });
    }
  }

  findIngredient(id) {
    this.foundIngredient = this.allIngredients.find(ingredient => {
      return ingredient.id === id;
    })
    return this.foundIngredient;
  }

  updateIngredientData(array, key) {
    this.allIngredients.forEach(ingredient => {
      this.findIngredient(ingredient.id);
      array.forEach(object => {
        if ((object.ingredient === ingredient.id) || (object.id === ingredient.id)) {
          return this.foundIngredient[key] = object[key];
        }
      });
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = IngredientInventory;
}
