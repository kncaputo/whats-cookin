const Ingredient = require('../src/ingredient');

class Recipe {
  constructor(id, imgSrc, name ) {
    this.id = id;
    this.image = imgSrc;
    this.name = name;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Recipe;
};
