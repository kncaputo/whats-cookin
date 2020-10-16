class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.estimatedCostInCents;
    this.amount = null;
    this.quantity = null;
  }

  updateIngredientData(array, key) {
    let ingredientName = array.find(ingredient => {
      return ingredient.id === this.id;
    });
    return this[key] = ingredientName[key];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
