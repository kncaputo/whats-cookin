
// querySelectors
let modal;
const recipeCardContainer = document.querySelector('.recipes-container');
const myFavoritesNav = document.querySelector('#my-favorites-nav');
const allRecipesNav = document.querySelector('#all-recipes-nav');
const myPantryNav = document.querySelector('#my-pantry-nav');
const whatsCookinNav = document.querySelector('#whats-cookin-nav');
const instructionsBtn = document.getElementById('preview-btn');
// const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close');
const searchContainer = document.querySelector('#search-container')

let user = new User(usersData[0]);
let allRecipes = [];

// eventListeners
window.onload = loadPage();
window.addEventListener('click', closeModal);

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);

// closeModalBtn.addEventListener('click', function() {
//   modal.style.display = "none";
// });
recipeCardContainer.addEventListener('click', function() {
  addRecipeToFavorites(event.target);
  addRecipeToWhatsCookin(event.target);
  openModel(event);
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
        <button id="favorite-btn"><img src="../assets/heart-icon-before.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
        <button id="whats-cookin-btn"><img src="../assets/plus-icon.png" id="whats-cookin-btn-${recipe.id}" alt="favorite button"></button>
      </div>
      <h3>${recipe.name}</h3>
      <button class="show-recipe-btn-${recipe.id}" id="show-recipe-btn"><h3 class="show-recipe-btn-${recipe.id}">Show Recipe</h3></button>
        <div class="modal">
          <div class="modal-content flex-column">
            <div class="modal-header">
              <div>
                <img src=${recipe.image} alt="recipe image" class="modal-banner">
              </div>
            </div>
            <div class="modal-body flex-column">
            <div class="modal-header-text flex-row">
              <button id="favorite-btn"><img src="../assets/heart-icon-before.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
              <h1>${recipe.name}</h1>
              <button id="whats-cookin-btn"><img src="../assets/plus-icon.png" id="whats-cookin-btn-${recipe.id}" alt="favorite button"></button>
            </div>
              <div class="flex-row">
              <div class="card-effect"
                <h2>Ingredients</h2>
                <p class="ingredients-display">${recipe.makeIngredients(ingredientsData)}</p>
                <p><b>Total Cost of Ingredients</b></p>
                <p class="ingredients-display">${recipe.calculateCost(ingredientsData)}</p>
              </div>
                <div class="card-effect"
                  <h2>How To Cook This</h2>
                  <p>${recipe.getInstructions()}<p>
                </div>
              </div>
            </div>
           </div>
         </div>
      </div>`
      return recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
    });
  }

function showFavorites() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.favoriteRecipes);
}

function showAllRecipes() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayRecipes(allRecipes);
}

function showMyPantry() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.pantry);
}

function showWhatsCookin() {
  searchContainer.classList.add('hidden');
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.recipesToCook);
}

function addRecipeToFavorites(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to favorites`)
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
    }
  })
}

function addRecipeToWhatsCookin(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to whats cookin`)
      user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', recipe);
    }
  })
}

function openModel() {
  allRecipes.forEach(recipe => {
    if (event.target.className === `show-recipe-btn-${recipe.id}`) {
      modal = document.querySelector('.modal');
      modal.style.display = 'block';
    }
  })
}

function closeModal(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// addToFavorites
// addToWhatsCookin
// displayPantry
// clicks a Nav button
// display search results
// preview Instructions
// display whatsCookin
// display allRecipes
// display favoriteRecipes
