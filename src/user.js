// const Pantry = require('./pantry.js');
// const RecipeBox = require('./recipeBox.js');

class User {
  constructor(user, ingredientsData, recipeData) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry, ingredientsData);
    this.recipeBox = new RecipeBox(recipeData, ingredientsData);
  }

  start() {
    this.pantry.makeIngredients();
    this.recipeBox.makeRecipes();
    this.recipeBox.allRecipes.forEach(recipe => {
      recipe.makeIngredients();
    });
  }

  updateRecipeBoolean(recipe, property) {
    recipe[property] = !recipe[property];
  }

  searchRecipes(input) {
    input = input.toLowerCase();
    console.log(input)
    let results = [];
    this.recipeBox.allRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if ((ingredient.name.includes(input)) && (!results.includes(recipe))) {
          results.push(recipe)
        }
      })
    })
    console.log(results)
    return results;
  }

  filterRecipeByType(input) {
    input = input.toLowerCase();
    return this.recipeBox.allRecipes.filter(recipe => {
      return recipe.tags.includes(input)
    })
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
