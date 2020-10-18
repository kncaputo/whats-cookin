const Ingredient = require('./ingredient.js');
const Recipe = require('./recipe.js');
const RecipeBox = require('./recipeBox.js');
const Pantry = require('./pantry.js');
const User = require('./user.js');

if (typeof module !== 'undefined') {
  module.exports = Ingredient;
};

if (typeof module !== 'undefined') {
  module.exports = Recipe;
};

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};

if (typeof module !== 'undefined') {
  module.exports = RecipeBox;
};

if (typeof module !== 'undefined') {
  module.exports = User;
};
