// const Ingredient = require('./ingredient');

class IngredientsInventory {
  constructor(ingredientsData) {
    this.allIngredients = ingredientsData;
  }

  makeIngredients() {
      if (this.allIngredients !== undefined) {
        let allIngredients = []
        this.allIngredients.forEach(ingredient => {
          allIngredients.push(new Ingredient(ingredient));
        })
        this.allIngredients = allIngredients;
      }
    }
  }


if (typeof module !== 'undefined') {
  module.exports = IngredientsInventory;
};
