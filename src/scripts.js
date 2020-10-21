// querySelectors
let modal;
const favoritesContainer = document.querySelector('.favorites-container');
const whatsCookinContainer = document.querySelector('.whats-cookin-container');
const whatsCookinPage = document.querySelector('.whats-cookin-page');
const myFavoritesNav = document.querySelector('#my-favorites-nav');
const allRecipesNav = document.querySelector('#all-recipes-nav');
const myPantryNav = document.querySelector('#my-pantry-nav');
const whatsCookinNav = document.querySelector('#whats-cookin-nav');
const instructionsBtn = document.getElementById('preview-btn');
const closeModalBtn = document.querySelector('.close');
const searchContainer = document.querySelector('#search-container');
const pantryContainer = document.querySelector('.pantry-container');
const allRecipesContainer = document.querySelector('.all-recipes-container');
const radios = document.querySelectorAll('.filters');
const filterSearch = document.querySelector('#filter-search');
const searchBar = document.querySelector('#search-bar');
const searchBtn = document.querySelector('#search-btn');
const reset = document.querySelector('#reset');
const aside = document.querySelector('aside');

let user = new User(usersData[Math.floor(Math.random() * 49)], ingredientsData, recipeData);

window.onload = loadPage();
window.addEventListener('click', closeModal);

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);
filterSearch.addEventListener('click', getValues);
searchBtn.addEventListener('click', executeSearch);
reset.addEventListener('click', resetFilters);


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
  openModal(event);
  markUnmarkReadyToCook(event);
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      markUnmarkAsFavorite(event);
      removeRecipeCard(event);
    }
  })
}

function resetFilters() {
  clearRecipeContainers();
  displayAllRecipes(user.recipeBox.allRecipes);
}

function executeSearch() {
  event.preventDefault();
  let userInput = searchBar.value;
  let resultRecipes = user.searchRecipes(userInput);
  clearRecipeContainers();
  displayAllRecipes(resultRecipes);
  searchBar.value = '';
}

function determineClickInWhatsCookin(event) {
  markUnmarkAsFavorite(event);

  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      markUnmarkReadyToCook(event);
      removeRecipeCard(event);
    }
  })
  displayWhatsCookinRecipe(event);
}

function displayWhatsCookinRecipe(event) {
  aside.classList.remove('hidden');
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `show-recipe-btn-${recipe.id}`) {
      document.querySelector('#aside-img').src = `${recipe.image}`
      document.querySelector('#recipe-title-whats-cookin').innerText = `${recipe.name}`;
      document.querySelector('#recipe-ingredients-whats-cookin').innerText = `${recipe.returnIngredients()}`;
      document.querySelector('#total-cost-whats-cookin').innerText = `${recipe.calculateCost()}`;
      document.querySelector('#shopping-list').innerText = `${user.pantry.checkStock(recipe)}`
    }
  })
}

function getValues() {
  clearRecipeContainers();

  let selection = document.getElementById('filter-search').elements['filter-search'].value;
  if (selection === 'all') {
    clearFilters();
  }
  const appetizers = ["antipasti", "starter", "snack", "appetizer", "antipasto", "hor d'oeuvre"];
  const breakfast = ["morning meal", "brunch", "breakfast", "morning meal", "brunch", "breakfast"];
  const dessert = [];
  const dinner = ["main course", "main dish", "dinner"];
  const dips = ["condiment", "dip", "spread", "sauce"];
  const lunch = ["lunch", "main course", "main dish", "salad", "dinner"];
  const sides = ["salad", "side", "side dish", "snack"];

  let filteredRecipes = [];

  if (selection === 'appetizers') {appetizers.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'breakfast') {breakfast.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'dessert') {dessert.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'dinner') {dinner.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'dips') {dips.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'lunch') {lunch.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  if (selection === 'sides') {sides.forEach(tag => {filteredRecipes.push(user.filterRecipeByType(tag))})}
  filteredRecipes = filteredRecipes.flat()

  let recipes = filteredRecipes.reduce((recipes, recipe) => {
    if (!recipes.includes(recipe)) {
      recipes.push(recipe);
    }
    return recipes;
  }, [])
  clearRecipeContainers();
  displayAllRecipes(recipes);
}

function markUnmarkAsFavorite(event) {
  user.recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      user.updateRecipeBoolean(recipe, 'isFavorite');
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

function loadPage() {
  user.start();
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
    <button id="favorite-btn"><img src="./assets/heart-icon-${recipe.isFavorite}.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
    <button class="whats-cookin-btn" id="whats-cookin-btn"><img class="whats-cookin-btn" src="./assets/plus-icon-${recipe.isReadyToCook}.png" id="whats-cookin-btn-${recipe.id}" alt="save button"></button>
  </div>
  <h3>${recipe.name}</h3>
  <button class="show-recipe-btn-${recipe.id}" id="show-recipe-btn-${recipe.id}"><h3 class="show-recipe-btn-${recipe.id}" id="show-recipe-btn-${recipe.id}">Show Recipe</h3></button>
  ${createModals(recipe)}
  </div>`
  return recipeCard;
}

function createModals(recipe) {
  let recipeModal = `<div class="modal" id="modal-${recipe.id}">
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
    let ingredientCard = `<div class="ingredient-card flex-row">
    <div>
      <p id="ingredient-name">${ingredient.name.toUpperCase()}</p>
      <p>Amount: ${ingredient.amount}</p>
    </div>
    <div class='decorative-line decorative-line-${ingredient.amount}'></div>
  </div>
  `;
  pantryContainer.insertAdjacentHTML('afterbegin', ingredientCard);
  });
}

function clearRecipeContainers() {
  allRecipesContainer.innerHTML = '';
  favoritesContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  whatsCookinContainer.innerHTML = '';
}

function showAllRecipes() {
  allRecipesContainer.classList.remove('hidden');
  searchContainer.classList.remove('hidden');
  whatsCookinPage.classList.add('hidden');
  clearRecipeContainers();
  displayAllRecipes(user.recipeBox.allRecipes);
}

function showFavorites() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.remove('hidden');
  whatsCookinPage.classList.add('hidden');
  clearRecipeContainers();

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

function showMyPantry() {
  whatsCookinPage.classList.add('hidden');
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.remove('hidden');
  clearRecipeContainers();
  displayIngredients();
}

function showWhatsCookin() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.add('hidden');
  clearRecipeContainers();
  user.recipeBox.allRecipes.forEach(recipe => {
    if (recipe.isReadyToCook === true) {
      displaySavedRecipes(recipe, 'whatsCookinContainer');
    }
  })
  displayWhatsCookinAside()
}

function displayWhatsCookinAside() {
  let asideContents = document.querySelector('#aside-contents');

  user.recipeBox.allRecipes.forEach(recipe => {
    if (recipe.isReadyToCook === true) {
      document.querySelector('#aside-img').src = `${recipe.image}`
      document.querySelector('#recipe-title-whats-cookin').innerText = `${recipe.name}`;
      document.querySelector('#recipe-ingredients-whats-cookin').innerText = `${recipe.returnIngredients()}`;
      document.querySelector('#total-cost-whats-cookin').innerText = `${recipe.calculateCost()}`;
    }
  })
  whatsCookinPage.classList.remove('hidden');
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
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `./assets/heart-icon-true.png`
  } else {
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `./assets/heart-icon-false.png`
  }
}

function togglePlusImg(recipe) {
  if (recipe.isReadyToCook === true) {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `./assets/plus-icon-true.png`
  } else {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `./assets/plus-icon-false.png`
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
    if (event.target.id === `show-recipe-btn-${recipe.id}`) {
      modal = document.querySelector(`#modal-${recipe.id}`);
      modal.style.display = 'block';
    }
  })
}

function closeModal(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}
