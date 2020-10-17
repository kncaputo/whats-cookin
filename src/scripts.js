
// querySelectors
let recipeCardContainer = document.querySelector('.recipes-container');
let myFavorites = document.querySelector('#my-favorites-nav');
let allRecipes = document.querySelector('#all-recipes-nav');
let myPantry = document.querySelector('#my-pantry-nav');
let whatsCookin = document.querySelector('#whats-cookin-nav');

let user = new User(usersData[0]);
let allRecipes = [];

// eventListeners
window.onload = loadPage();


myFavorites.addEventListener('click', showFavorites);
allRecipes.addEventListener('click', showAllRecipes);
// onLoad
  // instantiate user
    // instantiate pantry

  // instantiate all recipes
  // display all recipes on DOM
function loadPage() {
  recipeData.forEach(recipe => {
    allRecipes.push(new Recipe(recipe));
  })
  displayRecipes(allRecipes);
}

function displayRecipes(recipes) {
  recipes.forEach(recipe => {
    let recipeCard = `<div class="recipe-card">
      <div class="recipe-img-box">
        <img src=${recipe.image} alt="recipe image" class="recipe-display-img">
      </div>
      <div class="recipe-action-btns flex-row">
        <button id="favorite-btn"><img src="../assets/heart-icon-before.png" alt="favorite button"></button>
        <button id="whats-cookin-btn"><img src="../assets/plus-icon.png" alt="favorite button"></button>
      </div>
      <h3>${recipe.name}</h3>
    </div>`
    return recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
  });
}

function showFavorites() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.favoriteRecipes);
}

function showAllRecipes() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(showAllRecipes);
}
// add hidden
// remove hidden
// toggle hidden

// addToFavorites
// addToWhatsCookin
// displayPantry
// clicks a Nav button
// display search results
// preview Instructions
// display whatsCookin
// display allRecipes
// display favoriteRecipes
