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
const allRecipesContainer = document.querySelector('.all-recipes-container');

let user = new User(usersData[0], ingredientsData);
let recipeBox = new RecipeBox(recipeData, ingredientsData);

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

recipeCardContainer.addEventListener('click', () => {
  determineClick(event);
});
// ON HOMESCREEN
//when heart is clicked
// need to be able to mark as favorite/ unmark as favorite
  // need eventlisteners for heart icons (through event bubbling)
  // this should change boolean value, change heart icon (change heart icon)

  //when plus is clicked
  // need to be able to mark as readyToCook / unmark as readyToCook
   // need eventlisteners for plus (through event bubbling)
   // this should change boolean value of readyToCook, change plus icon
// ----------------------
// when favorites page is clicked on,
  // parse all recipes,
    // if isFavorites is true,
      // create recipe card and display
      // need eventlisteners for plus (through event bubbling)
  // when heart is deselected,
     // boolean value needs to change, toggle heart graphic, and splice html.

//WHATS COOKIN
//when what's Cookin page is clicked on,
  // parse all recipes
      // if what's cookin is true
      // create recipe card and display
      // need eventlisteners for plus (through event bubbling)
// when plus icon is deselected (aka minus is clicked),
  // boolean value needs to change, toggle plus graphic, and splice html.

// function determineClick(event) {
//   addRemoveFavorites(event);
//   addToWhatsCookin(event);
//   openModel(event);
// }
function determineClickOnAllRecipes(event) {
  markUnmarkAsFavorite(event);
  markUnmarkReadyToCook(event);
}

function determineClick(event) {
  markUnmarkAsFavorite(event);
  markUnmarkReadyToCook(event);
  removeRecipeCard(event);
  openModel(event);
}

function markUnmarkAsFavorite(event) {
  recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      updateRecipeBoolean(recipe, 'isFavorite');
      toggleHeartImg(recipe);
    }
  })
}

function markUnmarkReadyToCook(event) {
  recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      updateRecipeBoolean(recipe, 'readyToCook');
      togglePlusImg(recipe);
    }
  })
}

function updateRecipeBoolean(recipe, property) {
  recipe[property] = !recipe[property];
}

function loadPage() {
  recipeBox.makeRecipes()
  user.pantry.makeIngredients();
  user.pantry.ingredients.forEach(ingredient => {
    ingredient.updateIngredientData(user.pantry.ingredients, 'amount');
  })
  displayAllRecipes(recipeBox.allRecipes);
}

function displayAllRecipes(recipes) {
  recipes.forEach(recipe => {
    if (!user.favoriteRecipes.includes(recipe) && !user.recipesToCook.includes(recipe)) {
      let recipeCard = createRecipes(recipe)
      allRecipesContainer.insertAdjacentHTML('afterbegin', recipeCard);
    }
  })
}

// function displaySavedRecipes(recipes) {
//   recipes.forEach(recipe => {
//     let recipeCard = createRecipes(recipe)
//     recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
//   })
// }
//
// function highlightPageOnMenu(id) {
//   let navButton = document.getElementById(id);
//
//   if (navButton.style.color === 'black') {
//     navButton.style.color = '#d54215';
//   } else {
//     navButton.style.color = 'black';
//   }
// }

//
// function highlightPageOnMenu(eventId) {
//   let navButton = document.getElementById(eventId);
//
//   const navButtons = ['nav1', 'nav2', 'nav3', 'nav4'];
//   navButtons.forEach(id => {
//     if (navId === eventId) {
//       id.style.color = '#145b9c'
//     } else {
//       id.style.color = '#d54215'
//   })
// }

  function createRecipes(recipe) {
  let recipeCard = `<div class="recipe-card recipe-${recipe.id}" id="recipe-${recipe.id}">
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
              <p class="ingredients-display">${recipe.makeIngredients()}</p>
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
    return recipeCard
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
  allRecipesContainer.classList.remove('hidden');
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displayAllRecipes(recipeBox.allRecipes);
  // displayAllRecipes(user.favoriteRecipes);
  // displayAllRecipes(user.recipesToCook);
  highlightPageOnMenu('nav1');
}

function showFavorites() {
  allRecipesContainer.classList.add('hidden');
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  recipeBox.allRecipes.forEach(recipe => {
    if (recipe.isFavorite === true) {
      displayRecipesInFavorites(recipe);
    }
  })
}

function displayRecipesInFavorites(recipe) {
  let recipeCard = createRecipes(recipe)
  recipeCardContainer.insertAdjacentHTML('afterbegin', recipeCard);
}

function showMyPantry() {
  allRecipesContainer.classList.remove('hidden');
  searchContainer.classList.remove('hidden');
  recipeCardContainer.innerHTML = '';
  displayIngredients();
  highlightPageOnMenu('nav3');
}

function showWhatsCookin() {
  searchContainer.classList.add('hidden');
  recipeCardContainer.innerHTML = '';
  pantryContainer.innerHTML = '';
  displaySavedRecipes(user.recipesToCook);
  highlightPageOnMenu('nav4');
}

// function addRecipeToFavorites(target) {
//   recipeBox.allRecipes.forEach(recipe => {
//     if (event.target.id === `favorite-btn-${recipe.id}`) {
//       console.log(`added ${recipe.name} to favorites`)
//       user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
//     }
//   })
// }
//
// function addRecipeToWhatsCookin(target) {
//   recipeBox.allRecipes.forEach(recipe => {
//     if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
//       console.log(`added ${recipe.name} to whats cookin`)
//       user.toggleRecipeStatus(user.recipesToCook, 'readyToCook', recipe);
//     }
//   })
// }

// -------------- NOTES -----------------
// under user remove favorites arr and ready to cook array
// use the booleans in recipe when displaying favorites and ready to cook

//
// function addRemoveFavorites(target) {
//   let recipe = findRecipeFromEvent(event)
//   recipeBox.allRecipes.forEach(recipe => {
//
//     if ((event.target.id === `favorite-btn-${recipe.id}`) && (recipe.isFavorite === false)) {
//
//       console.log(`added ${recipe.name} to favorites`)
//       user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
//       toggleHeartImg(recipe);
//       debugger
//     } else if ((event.target.id === `favorite-btn-${recipe.id}`) && (recipe.isFavorite === true)){
//       console.log(`removed ${recipe.name} from favorites`)
//       //needs to make isFavorite = false (This is done on line 23 of toggleRecipeStatus)
//       //heart will need to be toggled on recipe in all recipes container
//       toggleHeartImg(recipe);
//       removeRecipeCard(recipe);
//
//       user.toggleRecipeStatus(user.favoriteRecipes, 'isFavorite', recipe);
//       // removeRecipeCard(recipe);
//       // recipeBox.allRecipes.push(recipe);
//     }
//   })
// }

function addRemoveWhatsCookin(target) {
  recipeBox.allRecipes.forEach(recipe => {
    if ((event.target.id === `whats-cookin-btn-${recipe.id}`) && (recipe.readyToCook === false)) {
      console.log(`added ${recipe.name} to What's Cookin'`)
      user.toggleRecipeStatus(user.readyToCook, 'readyToCook', recipe);
      togglePlusImg(recipe);
    } else if ((event.target.id === `whats-cookin-btn-${recipe.id}`) && (recipe.readyToCook === true)) {
      user.toggleRecipeStatus(user.readyToCook, 'readyToCook', recipe);
      removeRecipeCard(recipe);
      // recipeBox.allRecipes.push(recipe);
    }
  })
}

function removeRecipeCard(event) {
  recipeBox.allRecipes.forEach(recipe => {
    if (event.target.id === `favorite-btn-${recipe.id}`) {
      let toRemove = document.querySelector(`.recipes-container .recipe-${recipe.id}`);
      toRemove.remove(event.target.id === `favorite-btn-${recipe.id}`);
    } else if (event.target.id === `whats-cookin-btn-${recipe.id}`) {
      let toRemove = document.querySelector(`.recipes-container .recipe-${recipe.id}`);
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
  if (recipe.readyToCook === true) {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-${recipe.readyToCook}.png`
  } else {
    document.querySelector(`#whats-cookin-btn-${recipe.id}`).src = `../assets/plus-icon-${recipe.readyToCook}.png`
  }
}

function addToWhatsCookin(target) {
  recipeBox.allRecipes.forEach(recipe => {
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
