class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id || ingredient.ingredient;
    this.name = ingredient.name || null;
    this.estimatedCostInCents = ingredient.estimatedCostInCents || null;
    // this.amount = ingredient.amount || null;
    // this.quantity = ingredient.quantity || null;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
