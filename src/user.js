const Recipe = require('./recipe');
const Pantry = require('./pantry');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  addRecipeToFavorites(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  addRecipeToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  searchRecipes(input, recipes) {
    // input: user string from searchbar (INCLUDES name or ingredient)
        // arr of all recipe objs
    // output: an array of obj filtered to match search criteria/input
    // methods to use: FOREACH recipe, FILTER name/ingredient,
    // if INCLUDES input, return mutated array within method

    // recipes.forEach(recipe => {
    //   if (recipe.name)
    // })
  }

  filterRecipeByType() {

  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
};
