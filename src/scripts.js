
// querySelectors
let recipeCardContainer = document.querySelector('.recipes-container');
// eventListeners
// document.addEventListener('onload', loadPage());
window.onload = loadPage();
// onLoad
  // instantiate user
    // instantiate pantry

  // instantiate all recipes
  // display all recipes on DOM
function loadPage() {
  let allRecipes = [];
  recipeData.forEach(recipe => {
    allRecipes.push(new Recipe(recipe));
  })
  console.log(allRecipes);
  allRecipes.forEach(recipe => {
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

  let user = new User(usersData[0]);
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
