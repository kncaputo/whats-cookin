const Ingredient = require('../src/ingredient');

class Pantry {
  constructor(pantry) {
    this.ingredients = pantry || [];
    this.ingredientsNeeded = [];
  }

  extractValues(array, itemCriteria) {
    if (array !== undefined) {
      let allValues = array.reduce((values, item) => {
        values.push(item[itemCriteria]);
        return values;
      }, []);
      return allValues;
    }
  }

  makeIngredients(ingredientsData) {
    let allIngredients = [];
    let ingredientIds = this.extractValues(this.ingredients, 'ingredient');
    let ingredientAmounts = this.extractValues(this.ingredients, 'amount');

    if (ingredientsData !== undefined) {
      ingredientIds.forEach(id => {
        ingredientsData.filter(ingredient => {
          if (ingredient.id === id) {
            allIngredients.push(new Ingredient(ingredient));
          }
        })
      })

      this.updateIngredientAmount(allIngredients);

      this.ingredients = allIngredients;
    }
  }

  updateIngredientAmount(pantry) {
    pantry.forEach(item => {
      this.ingredients.filter(ingredient => {
        if (ingredient.ingredient === item.id) {
          item.amount = ingredient.amount;
        }
      })
    })
  }

  checkStock(recipe) {
    let ingredientIds = this.extractValues(this.ingredients, 'id');
    let ingredientsInStock = [];
    let ingredientsNeeded = []
    recipe.ingredients.forEach(recipeIngredient => {
      if (ingredientIds.includes(recipeIngredient.id)) {
        this.ingredients.filter(pantryIngredient => {
          if ((pantryIngredient.id === recipeIngredient.id) && (recipeIngredient.quantity.amount <= pantryIngredient.amount)) {
            ingredientsInStock.push(true);
          }
        })
      } else {
          ingredientsNeeded.push(recipeIngredient);
      }
    })

    // this.makeIngredientsNeeded(recipe, ingredientsNeeded, ingredientsData);

    if (ingredientsInStock.length === recipe.ingredients.length) {
      return true;
    } else {
      return false;
    }
  }

  // makeIngredientsNeeded(recipe, ingredientsNeeded, ingredientsData) {
  //   // ingredientsNeeded = arr of obj from recipe which we needed
  //   //  output wanted: arry of ingredient obj w/ id, name, amount needed - new instance
  //   // parameters: recipe (recipe object), ingredientsNeeded (array of ids)
  //   // if (ingredientsData !== undefined) {
  //   //   ingredientsNeeded.forEach(recipeIngredient => {
  //   //     ingredientsData.filter(ingredient => {
  //   //       if (ingredient.id === recipeIngredient.id) {
  //   //
  //   //
  //   //         allIngredients.push(new Ingredient(ingredient, recipeIngredient.quantity.amount.value));
  //   //       }
  //   //     })
  //   //   })
  //
  //       // this.ingredientsNeeded updates with instances of Ingredient in an array
  //   });


    // have: recipe obj w/ id property and arr of ingredients w/ amnts needed
    // output wanted: arry of ingredient obj w/ id, name, amount needed - new instance?
    // forEach recipe.ingredient.id
    // find this.ingredients.id
      // declare var for amount needed
      //assign to value of recipe ingredient quantity amount - this. pantry ingredient amount
      //
}



if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
