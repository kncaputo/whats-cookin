class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name || null;
    this.estimatedCostInCents = ingredient.estimatedCostInCents || null;
    this.amount = ingredient.amount || null;
    this.quantity = ingredient.quantity || null;
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
