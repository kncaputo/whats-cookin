// const Ingredient = require('../src/ingredient');

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.name = recipe.name;
    this.instructions = recipe.instructions;
  }

  getInstructions() {
    return this.instructions.reduce((instructions, step) => {
      instructions.push(`${step.number}. ${step.instruction}`);
      return instructions;
    }, []);
  }


  calculateCost() {
    // start with this.ingredients (array)
    // this.ingredients[i] include id (#) & quantity object
      // Grab this.ingredients[i].id
    // in ingredients dataset, check for presence of id numbe in value of each object's //
    // If they match, make a new empty array and push the cost into that
  }

}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
};
