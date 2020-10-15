const Ingredient = require('./ingredient');
const Recipe = require('./recipe');
const Pantry = require('./pantry');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.pantry = new Pantry(user.pantry);
  }

  addRecipeToFavorites() {

  }

  addRecipeToCook() {

  }

  searchRecipes() {

  }

  filterRecipeByType() {

  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
};
