// const Recipe = require('./recipe');

class RecipeBox {
  constructor(rawRecipeData, rawIngredientsData) {
    this.rawRecipeData = rawRecipeData;
    this.rawIngredientsData = rawIngredientsData;
    this.allRecipes = [];
    this.favoriteRecipes = [];
    this.whatsCookinRecipes = [];
  }

  makeRecipes() {
    if (this.rawRecipeData !== undefined) {
      this.rawRecipeData.forEach(recipe => {
        this.allRecipes.push(new Recipe(recipe, this.rawIngredientsData));
      })

      this.allRecipes.forEach(recipe => {
        recipe.makeIngredients();
      })
    }
  }

  updateFavoriteRecipes() {
    this.favoriteRecipes = [];
    this.allRecipes.forEach(recipe => {
      if (recipe.isFavorite === true) {
        this.favoriteRecipes.push(recipe);
      }
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = RecipeBox;
};
