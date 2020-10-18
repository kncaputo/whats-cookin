// const Ingredient = require('./ingredient.js');
// const Pantry = require('./pantry.js');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry);
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  toggleRecipeStatus(array, location, recipe) {
    if (recipe[location] === false) {
      array.push(recipe);
    } else {
      let recipeToRemove = array.find(element => {
        return element.id === recipe.id;
      });
      return array.splice(recipeToRemove, 1);
    }

    recipe[location] = !recipe[location];
  }


  searchRecipes(input, recipes) {
    recipes.forEach(recipe => {
      if (!recipe.name.includes(input)) {
        // splice
      }
    });
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
