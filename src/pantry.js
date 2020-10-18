// const Ingredient = require('../src/ingredient');

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
      if (ingredientsData !== undefined) {
        let allIngredients = []
        let currentIngredient;
        // console.log('this ingredeients: ', this.ingredients);
        this.ingredients.forEach(ingredient => {
          // console.log("This is the current ingredient: ", ingredient)
          currentIngredient = ingredient;
          // console.log("This is the currentIngredient var: ", currentIngredient)
          allIngredients.push(new Ingredient(currentIngredient));
          // console.log("In the forEach allIngredients arr: ", allIngredients)
        })
        console.log("All ingredients: ", allIngredients)
        allIngredients.forEach(ingredient => {
          debugger;
          ingredient.updateIngredientData(ingredientsData, 'name', 'ingredient');
          ingredient.updateIngredientData(ingredientsData, 'estimatedCostInCents', 'ingredient');
          // console.log(ingredient.id)
        })
        this.ingredients = allIngredients;
      }
    }

  makeIngredientsNeeded(ingredientsData, ingredientsNeeded) {
    if (ingredientsData !== undefined) {
      let allIngredients = []
      ingredientsNeeded.forEach(ingredient => {
        allIngredients.push(new Ingredient(ingredient));
      })

      allIngredients.forEach(ingredient => {
        ingredient.updateIngredientData(ingredientsData, 'name', 'ingredient');
        ingredient.updateIngredientData(ingredientsData, 'estimatedCostInCents', 'ingredient');
      })
      this.ingredientsNeeded = allIngredients;
    }
  }

  checkStock(recipe, ingredientsData) {
    let ingredientIds = this.extractValues(this.ingredients, 'id');
    let ingredientsInStock = [];
    let ingredientsNeeded = [];
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
    this.makeIngredientsNeeded(ingredientsData, ingredientsNeeded);

    if (ingredientsInStock.length === recipe.ingredients.length) {
      return true;
    } else {
      return false;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pantry;
};
