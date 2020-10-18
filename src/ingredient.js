class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id || ingredient.ingredient;
    this.name = ingredient.name || null;
    this.estimatedCostInCents = ingredient.estimatedCostInCents || null;
    this.amount = ingredient.amount || null;
    this.quantity = ingredient.quantity || null;
  }

  updateIngredientData(array, key, id) {
    console.log('initial data (array): ', array);
    console.log('initial data (KEY): ', key);
    console.log('initial data (ID): ', id);
    let ingredientName = array.find(ingredient => {
      console.log('this.id: ', this[id])
      console.log('ingredient: ', ingredient);

      if (id === 'id') {
        return ingredient[id] === this[id];
      } else if (id === 'ingredient') {
        return ingredient[ingredient] === this[id];
      }
    });
    this.id = ingredientName.id;
    return this[key] = ingredientName[key];
  }
}

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};
