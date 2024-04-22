import * as model from "./model";
import recipeView from "./views/recipeView";
import searchView from "./views/searchView";

import "core-js/stable";
import "regenerator-runtime/runtime";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1) ?? "";
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function (e) {
  try {
    e.preventDefault();
    const query = document.querySelector(".search__field").value;
    searchView.renderSpinner();
    await model.searchResults(query);
    searchView.render(model.state.search);
  } catch (err) {
    searchView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandleRender(controlSearchResults);
};

init();
