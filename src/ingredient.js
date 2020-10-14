class Ingredient {
  constructor(ingredient, amount) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.cost = ingredient.estimatedCostInCents;
    this.amount = amount;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
