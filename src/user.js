// const Pantry = require('./pantry.js');
// const RecipeBox = require('./recipeBox.js');

class User {
  constructor(user, ingredientsData, recipeData) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry, ingredientsData);
    this.recipeBox = new RecipeBox(recipeData, ingredientsData);
  }

  updateRecipeBoolean(recipe, property) {
    recipe[property] = !recipe[property];
  }

  // searchRecipes(input) {
  //   this.recipeBox.allRecipes.filter(recipe => {
  //     if (recipe.name.includes(input)) {
  //       // show those recipes
  //     }
  //
  //     recipe.ingredients.forEach(ingredient => {
  //       if (ingredient.name.includes(input)) {
  //         // show those recipes
  //       }
  //     })
      // return mutated array to show on the DOM
    // })

    // input: user string from searchbar (INCLUDES name or ingredient)
        // arr of all recipe objs
    // output: an array of obj filtered to match search criteria/input
    // methods to use: FOREACH recipe, FILTER name/ingredient,
    // if INCLUDES input, return mutated array within method
  //
  // }

  filterRecipeByType() {

  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
};
