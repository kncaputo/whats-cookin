
// querySelectors
let recipeCardContainer = document.querySelector('.recipes-container');
let myFavoritesNav = document.querySelector('#my-favorites-nav');
let allRecipesNav = document.querySelector('#all-recipes-nav');
let myPantryNav = document.querySelector('#my-pantry-nav');
let whatsCookinNav = document.querySelector('#whats-cookin-nav');
let instructionsBtn = document.getElementById('preview-btn');
let modal = document.querySelector('.modal');
let closeModalBtn = document.querySelector('.close');

let user = new User(usersData[0]);
let allRecipes = [];

// eventListeners
window.onload = loadPage();
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);

modal.addEventListener('click', function() {
  modal.style.display = 'block';
});
closeModalBtn.addEventListener('click', function() {
  modal.style.display = "none";
});
recipeCardContainer.addEventListener('click', function() {
  determineRecipeClick(event.target);
  showModal(event);
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
          <div class="modal-content">
            <div class="modal-header">
              <span class="close">&times;</span>
                 <h2>Recipe</h2>
            </div>
            <div class="modal-body">
              <h3>Insert instructions here</h3>
            </div>
           </div>
         </div>
      </div>`
      return recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
    });
  }

function showFavorites() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.favoriteRecipes);
}

function showAllRecipes() {
  displayRecipes(allRecipes);
}

function showMyPantry() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.pantry);
}

function showWhatsCookin() {
  recipeCardContainer.innerHTML = '';
  displayRecipes(user.whatsCookin);
}

function determineRecipeClick(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      console.log("you're in here")
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
    }
  })
}

function showModal() {
  allRecipes.forEach(recipe => {
    if (event.target.className === `show-recipe-btn-${recipe.id}`) {
      modal.classList.add('modal-active')
      console.log("This works");
      // modal.style.display = 'block !important';
    }
  })
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
