const Ingredient = require('../src/ingredient');

class Recipe {
  constructor(recipe) {
    recipe = recipe || {}
    this.id = recipe.id || null;
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


  makeIngredients(ingredientsData) {
    let allIngredients = [];
    console.log('before function:' + this.ingredients[0].name)

    this.ingredients.map(recipeIngredient => {
      ingredientsData.filter(ingredient => {
        if (recipeIngredient.id === ingredient.id) {
          recipeIngredient.name = ingredient.name;
          recipeIngredient.cost = ingredient.estimatedCostInCents;
          console.log('ingredient name: ' + recipeIngredient.name)
          console.log('ingredient cost: ' + recipeIngredient.estimatedCostInCents)
          allIngredients.push(new Ingredient(recipeIngredient))
          return allIngredients;
          console.log('ingredient cost: ' + recipeIngredient.cost);
        }
      })
    })

    console.log('after first map:' + this.ingredients[0].name)

    this.ingredients = allIngredients;

    // return this.ingredients.forEach(ingredient => {
    //   console.log('ingredient inside forEach: ' + ingredient.id + ingredient.name + ingredient.cost + ingredient.quantity)
    //   allIngredients.push(new Ingredient(ingredient))
    //   return allIngredients;
    // });



    // console.log('should be brown sugar: ' + this.ingredients[1].name)
  }


  calculateCost(ingredientsData) {
    if (!ingredientsData) {
      return 'Insufficient data available';
    }

    let totalCost = 0;

    const ids = this.ingredients.reduce((ingredientIds, ingredient) => {
      ingredientIds.push(ingredient.id);
      return ingredientIds;
    }, []);

    ids.forEach(id => {
      ingredientsData.filter(ingredient => {
        if (ingredient.id === id) {
          totalCost += ingredient.estimatedCostInCents
        }
      })
    })

    return totalCost;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
}
