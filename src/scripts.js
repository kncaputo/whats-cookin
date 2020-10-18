// querySelectors
let modal;
const recipeCardContainer = document.querySelector('.recipes-container');
const myFavoritesNav = document.querySelector('#my-favorites-nav');
const allRecipesNav = document.querySelector('#all-recipes-nav');
const myPantryNav = document.querySelector('#my-pantry-nav');
const whatsCookinNav = document.querySelector('#whats-cookin-nav');
const instructionsBtn = document.getElementById('preview-btn');
const closeModalBtn = document.querySelector('.close');
const searchContainer = document.querySelector('#search-container');
const pantryContainer = document.querySelector('.pantry-container');

let user = new User(usersData[0], ingredientsData);
// // let allRecipes = []
// let ingredientsInventory = new IngredientsInventory(ingredientsData);
let recipeBox = new RecipeBox(recipeData, ingredientsData);

// eventListeners
window.onload = loadPage();
window.addEventListener('click', closeModal);

myFavoritesNav.addEventListener('click', showFavorites);
allRecipesNav.addEventListener('click', showAllRecipes);
myPantryNav.addEventListener('click', showMyPantry);
whatsCookinNav.addEventListener('click', showWhatsCookin);

recipeCardContainer.addEventListener('click', () => {
  determineClick(event);
});

function determineClick(event) {
  addRemoveFavorites(event.target);
  addToWhatsCookin(event.target);
  openModel(event);
}

function loadPage() {
  // recipeData.forEach(recipe => {
  //   allRecipes.push(new Recipe(recipe));
  // })
  // displayRecipes(allRecipes);

  recipeBox.makeRecipes()
  user.pantry.makeIngredients();
  user.pantry.ingredients.forEach(ingredient => {
    ingredient.updateIngredientData(user.pantry.ingredients, 'amount');
  })
  displayRecipes(recipeBox.allRecipes);
}

function highlightPageOnMenu(id) {
  let navButton = document.getElementById(id);

  if (navButton.style.color === 'black') {
    navButton.style.color = '#d54215';
  } else {
    navButton.style.color = 'black';
  }
}


// function highlightPageOnMenu(eventId) {
//   let navButton = document.getElementById(eventId);
//   const navButtons = ['nav1', 'nav2', 'nav3', 'nav4'];
//   navButtons.forEach(id => {
//     if (navId === eventId) {
//       [id].style.color = '#145b9c'
//     } else {
//       [id].style.color = '#d54215'
//   })
// }

function displayRecipes(recipes) {
  recipes.forEach(recipe => {
    let recipeCard = `<div class="recipe-card recipe-${recipe.id}">
      <div class="recipe-img-box">
        <img src=${recipe.image} alt="recipe image" class="recipe-display-img">
      </div>
      <div class="recipe-action-btns flex-row">
        <button id="favorite-btn"><img src="../assets/heart-icon-${recipe.isFavorite}.png" id="favorite-btn-${recipe.id}" alt="favorite button"></button>
        <button id="whats-cookin-btn"><img src="../assets/plus-icon-${recipe.readyToCook}.png" id="whats-cookin-btn-${recipe.id}" alt="save button"></button>
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
              <h1>${recipe.name}</h1>
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

function displayIngredients() {
  user.pantry.makeIngredients(ingredientsData);
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
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(recipeBox.allRecipes);
  highlightPageOnMenu('nav1');
}

function showFavorites() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(user.favoriteRecipes);
  highlightPageOnMenu('nav2');
}

function showMyPantry() {
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayIngredients();
  highlightPageOnMenu('nav3');
}

function showWhatsCookin() {
  searchContainer.classList.add('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayRecipes(user.recipesToCook);
  highlightPageOnMenu('nav4');
}

function addRecipeToFavorites(target) {
  recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to favorites`)
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
    }
  })
}

function addRecipeToWhatsCookin(target) {
  recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to whats cookin`)
      user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', recipe);
    }
  })
}

function addRemoveFavorites(target) {
  allRecipes.forEach(recipe => {
    if ((event.target.id === `favorite-btn-${recipe.id}`) && (recipe.isFavorite === false)) {
      console.log(`added ${recipe.name} to favorites`)
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
      toggleHeartImg(recipe);
    } else if ((event.target.id === `favorite-btn-${recipe.id}`) && (recipe.isFavorite === true)) {
      user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
      removeRecipeCard(recipe);
      allRecipes.push(recipe);
    }
  })
}
function addRemoveWhatsCookin(target) {
  allRecipes.forEach(recipe => {
    if ((event.target.id === `whats-cookin-btn-${recipe.id}`) && (recipe.readyToCook === false)) {
      console.log(`added ${recipe.name} to What's Cookin'`)
      user.toggleRecipeStatus(user.readyToCook, 'readyToCook', recipe);
      togglePlusImg(recipe);
    } else if ((event.target.id === `whats-cookin-btn-${recipe.id}`) && (recipe.readyToCook === true)) {
      user.toggleRecipeStatus(user.readyToCook, 'readyToCook', recipe);
      removeRecipeCard(recipe);
      allRecipes.push(recipe);
    }
  })
}

function removeRecipeCard(recipe) {
  let toRemove = document.querySelector(`.recipe-${recipe.id}`)
  toRemove.remove();
}

function toggleHeartImg(recipe) {
  if (recipe.isFavorite === true) {
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `../assets/heart-icon-true.png`
  } else {
    document.querySelector(`#favorite-btn-${recipe.id}`).src = `../assets/heart-icon-false.png`
  }
}

function togglePlusImg(recipe) {
  if (recipe.readyToCook === true) {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-${recipe.readyToCook}.png`
  } else {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-${recipe.readyToCook}.png`
  }
}

function addToWhatsCookin(target) {
  allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      console.log(`added ${recipe.name} to whats cookin`)
      user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', recipe);
    }
  })
}

function openModel() {
  recipeBox.allRecipes.forEach(recipe => {
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
