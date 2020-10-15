class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.estimatedCostInCents;
    this.amount = null;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
