class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.estimatedCostInCents || null;
    this.amount = null;
    this.quantity = ingredient.quantity || null
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
