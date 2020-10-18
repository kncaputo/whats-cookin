
// querySelectors
let recipeCardContainer = document.querySelector('.recipes-container');
let myFavoritesNav = document.querySelector('#my-favorites-nav');
let allRecipesNav = document.querySelector('#all-recipes-nav');
let myPantryNav = document.querySelector('#my-pantry-nav');
let whatsCookinNav = document.querySelector('#whats-cookin-nav');
let instructionsBtn = document.getElementById('preview-btn');
let instructionsModal = document.querySelector('.modal');
let closeModalBtn = document.querySelector('.close');

let user = new User(usersData[0]);
let allRecipes = [];

// eventListeners
window.onload = loadPage();
window.addEventListener('click', function(event) {
  if (event.target == instructionsModal) {
    instructionsModal.style.display = 'none';
  }
});

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);
instructionsBtn.addEventListener('click', function() {
  instructionsModal.style.display = 'block';
});
closeModalBtn.addEventListener('click', function() {
  instructionsModal.style.display = "none";
});

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
  displayRecipes(showAllRecipes);
}

function showMyPantry() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.pantry);
}

function showWhatsCookin() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.whatsCookin);
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
