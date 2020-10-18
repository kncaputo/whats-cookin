class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id || ingredient.ingredient;
    this.name = ingredient.name || null;
    this.estimatedCostInCents = ingredient.estimatedCostInCents || null;
    this.amount = ingredient.amount || null;
    this.quantity = ingredient.quantity || null;
  }

  updateIngredientData(array, key) {
    let foundIngredient = array.find(ingredient => {
      return ingredient.id === this.id;
    });
    if (!foundIngredient) {
      debugger;
    }
    return this[key] = foundIngredient[key];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
