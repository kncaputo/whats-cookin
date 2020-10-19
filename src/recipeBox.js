const Recipe = require('./recipe');

class RecipeBox {
  constructor(rawRecipeData, rawIngredientsData) {
    this.rawRecipeData = rawRecipeData;
    this.rawIngredientsData = rawIngredientsData;
    this.allRecipes = [];
    // this.ingredientsInventory = new IngredientsInventory(rawIngredientsData);
  }

  makeRecipes() {
    if (this.rawRecipeData !== undefined) {
      recipeData.forEach(recipe => {
      this.allRecipes.push(new Recipe(recipe, this.rawIngredientsData));
      })
    this.allRecipes.forEach(recipe => {
      recipe.makeIngredients();
    })
    }
  }

  // makeIngredients() {
  //   this.ingredientsInventory.makeIngredients()
  //   this.allRecipes.forEach(recipe => {
  //     recipe.ingredients.map(ingredient => {
  //       let foundIngredient = this.ingredientsInventory.findIngredient(ingredient.id)
  //
  //     })
  //   })

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

}

if (typeof module !== 'undefined') {
  module.exports = RecipeBox;
};
