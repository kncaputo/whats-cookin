// const Recipe = require('./recipe');

class RecipeBox {
  constructor(rawRecipeData) {
    this.allRecipes = rawRecipeData;
  }

  makeRecipes(rawRecipeData) {
    if (rawRecipeData !== undefined) {
      let allRecipes = []
      recipeData.forEach(recipe => {
        allRecipes.push(new Recipe(recipe));
      })
      this.allRecipes = allRecipes;
      }
    }
  }

  // makeIngredients(ingredientsData) {
  //   if (ingredientsData !== undefined) {
  //     this.allRecipes.forEach(recipe => {
  //       let recipeIngredients = []
  //       recipe.ingredients.forEach(ingredient => {
  //         recipeIngredients.push(new Ingredient(ingredient));
  //       });
  //
  //     });
  //
  //     // allIngredients.forEach(ingredient => {
  //     //   ingredient.updateIngredientData(ingredientsData, 'name', 'ingredient');
  //     //   ingredient.updateIngredientData(ingredientsData, 'estimatedCostInCents', 'ingredient');
  //     // })
  //     // this.ingredients = allIngredients;
  //   }
  // }

if (typeof module !== 'undefined') {
  module.exports = RecipeBox;
};
