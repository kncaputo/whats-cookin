// querySelectors
let modal;
const favoritesContainer = document.querySelector('.favorites-container');
const whatsCookinContainer = document.querySelector('.whats-cookin-container');
const myFavoritesNav = document.querySelector('#my-favorites-nav');
const allRecipesNav = document.querySelector('#all-recipes-nav');
const myPantryNav = document.querySelector('#my-pantry-nav');
const whatsCookinNav = document.querySelector('#whats-cookin-nav');
const instructionsBtn = document.getElementById('preview-btn');
const closeModalBtn = document.querySelector('.close');
const searchContainer = document.querySelector('#search-container');
const pantryContainer = document.querySelector('.pantry-container');
const allRecipesContainer = document.querySelector('.all-recipes-container');

let user = new User(usersData[0], ingredientsData, recipeData);

// eventListeners
window.onload = loadPage();
window.addEventListener('click', closeModal);

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);

allRecipesContainer.addEventListener('click', () => {
  determineClickOnAllRecipes(event);
});

favoritesContainer.addEventListener('click', () => {
  determineClickInFavorites(event);
});

whatsCookinContainer.addEventListener('click', () => {
  determineClickInWhatsCookin(event);
});

function determineClickOnAllRecipes(event) {
  markUnmarkAsFavorite(event);
  markUnmarkReadyToCook(event);
  openModal(event);
}

function determineClickInFavorites(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      markUnmarkAsFavorite(event);
      removeRecipeCard(event);
    }
  })
  markUnmarkReadyToCook(event);
  openModal(event);
}

function determineClickInWhatsCookin(event) {
  markUnmarkAsFavorite(event);
  openModal(event);
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      markUnmarkReadyToCook(event);
      removeRecipeCard(event);
    }
  })
}

// if (event.target.id === ) {
//   markUnmarkisReadyToCook(event);
//   // debugger
//   removeRecipeCard(event);
// }
// // removeRecipeCard(event);

function markUnmarkAsFavorite(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      user.updateRecipeBoolean(recipe, 'isFavorite');
      // debugger
      toggleHeartImg(recipe);
    }
  })
}

function markUnmarkReadyToCook(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      user.updateRecipeBoolean(recipe, 'isReadyToCook');
      togglePlusImg(recipe);
    }
  })
}
//
// function loadPage() {
//   user.recipeBox.makeRecipes()
//   user.pantry.makeIngredients();
//   user.pantry.ingredients.forEach(ingredient => {
//     ingredient.updateIngredientData(user.pantry.ingredients, 'amount');
//   })
//   displayAllRecipes(user.recipeBox.allRecipes);
// }

function loadPage() {
  user.recipeBox.makeRecipes()
  user.pantry.makeIngredients();
  user.pantry.ingredientInventory.updateIngredientData(user.pantry.rawPantryData, 'amount');
  user.recipeBox.allRecipes.forEach(recipe => {
    recipe.ingredientInventory.updateIngredientData(user.recipeBox.rawRecipeData, 'quantity');
  })
  displayAllRecipes(user.recipeBox.allRecipes);
}

function displayAllRecipes(recipes) {
  recipes.forEach(recipe => {
    let recipeCard = createRecipes(recipe)
    allRecipesContainer.insertAdjacentHTML('afterbegin', recipeCard);
  })
}



function createRecipes(recipe) {
let recipeCard = `<div class="recipe-card recipe-${recipe.id}" id="recipe-${recipe.id}">
  <div class="recipe-img-box">
    <img src=${recipe.image} alt="recipe image" class="recipe-display-img">
  </div>
  <div class="recipe-action-btns flex-row">
    <button id="favorite-btn"><img src="../assets/heart-icon-${recipe.isFavorite}.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
    <button class="whats-cookin-btn" id="whats-cookin-btn"><img class="whats-cookin-btn" src="../assets/plus-icon-${recipe.isReadyToCook}.png" id="whats-cookin-btn-${recipe.id}" alt="save button"></button>
  </div>
  <h3>${recipe.name}</h3>
  <button class="show-recipe-btn-${recipe.id}" id="show-recipe-btn"><h3 class="show-recipe-btn-${recipe.id}">Show Recipe</h3></button>
  ${createModals(recipe)}
  </div>`
  return recipeCard;
}

function createModals(recipe) {
  let recipeModal = `<div class="modal">
    <div class="modal-content flex-column">
      <div class="modal-header">
        <div>
          <img src=${recipe.image} alt="recipe image" class="modal-banner">
        </div>
      </div>
      <div class="modal-body flex-column">
      <div class="modal-header-text flex-row">
        <h1>${recipe.name}</h1>
      </div>
        <div class="flex-row">
        <div class="card-effect"
          <h2>Ingredients</h2>
          <p class="ingredients-display">${recipe.returnIngredients()}</p>
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
   </div>`
   return recipeModal;
}

function displayIngredients() {
  user.pantry.updateIngredientData(user.pantry.rawPantryData, 'amount');
  user.pantry.ingredients.forEach(ingredient => {
    var ingredientCard = `<div class="ingredient-card flex-row">
    <div>
      <p id="ingredient-name">${ingredient.name.toUpperCase()}</p>
      <p>Amount: ${ingredient.amount}</p>
    </div>
    <div class="decorative-line"></div>
  </div>
  `;
  pantryContainer.insertAdjacentHTML('afterbegin', ingredientCard);
  });
}


function showAllRecipes() {
  allRecipesContainer.classList.remove('hidden');
  searchContainer.classList.remove('hidden');
  favoritesContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  whatsCookinContainer.innerHTML = '';
  displayAllRecipes(user.recipeBox.allRecipes);
  // highlightPageOnMenu('nav1');
}

function showFavorites() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.remove('hidden');
  favoritesContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  whatsCookinContainer.innerHTML = '';

  user.recipeBox.allRecipes.forEach(recipe => {
    if (recipe.isFavorite === true) {
      displaySavedRecipes(recipe, 'favoritesContainer');
    }
  })
}

function displaySavedRecipes(recipe, container) {
  let recipeCard = createRecipes(recipe)
  if (container === 'favoritesContainer') {
    favoritesContainer.insertAdjacentHTML('afterbegin', recipeCard);
  } else if (container === 'whatsCookinContainer') {
    whatsCookinContainer.insertAdjacentHTML('afterbegin', recipeCard);
  }
}

// function displaySavedRecipes(recipe) {
//   let recipeCard = createRecipes(recipe)
//   recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
// }

function showMyPantry() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.remove('hidden');
  favoritesContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  whatsCookinContainer.innerHTML = '';
  displayIngredients();
  // highlightPageOnMenu('nav3');
}

function showWhatsCookin() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.add('hidden');
  favoritesContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  whatsCookinContainer.innerHTML = '';
  user.recipeBox.allRecipes.forEach(recipe => {
    if (recipe.isReadyToCook === true) {
      displaySavedRecipes(recipe, 'whatsCookinContainer');
    }
  })
}

function removeRecipeCard(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      let toRemove = document.querySelector(`.favorites-container .recipe-${recipe.id}`);
      toRemove.remove(event.target.id === `favorite-btn-${recipe.id}`);
    } else if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      let toRemove = document.querySelector(`.whats-cookin-container .recipe-${recipe.id}`);
      toRemove.remove(event.target.id === `whats-cookin-btn-${recipe.id}`);
    }
  })
}

function toggleHeartImg(recipe) {
  if (recipe.isFavorite === true) {
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `../assets/heart-icon-true.png`
  } else {
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `../assets/heart-icon-false.png`
  }
}

function togglePlusImg(recipe) {
  if (recipe.isReadyToCook === true) {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-true.png`
  } else {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-false.png`
  }
}

function addToWhatsCookin(target) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to whats cookin`)
      user.toggleRecipeStatus(user.recipesToCook, 'isReadyToCook', recipe);
    }
  })
}

function openModal(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
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
