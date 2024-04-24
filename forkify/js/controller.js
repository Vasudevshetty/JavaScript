import * as model from "./model";
import recipeView from "./views/recipeView";
import resultsView from "./views/resultsView";
import searchView from "./views/searchView";
import paginationView from "./views/paginationView";
import bookmarksView from "./views/bookmarksView";

import { getLocalStorage } from "./helpers";

import "core-js/stable";
import "regenerator-runtime/runtime";
import addRecipeView from "./views/addRecipeView";
import { MODAL_CLOSE_SEC } from "./config";

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1) ?? "";
    if (!id) return;
    recipeView.renderSpinner();
    resultsView.update(model.getPageResults());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.searchResults(query);
    searchView.clearInput();

    resultsView.render(model.getPageResults());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getPageResults(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlLoad = function () {
  const bookmarks = getLocalStorage("bookmarks");
  const query = getLocalStorage("query");
  const recipe = getLocalStorage("recipe");

  if (!recipe)
    recipeView.renderMessage(
      "Start by searching for a recipe or an ingredient. Have fun!"
    );

  if (!query)
    resultsView.renderMessage("Search results will be displayed here. :)");

  if (!bookmarks)
    bookmarksView.renderMessage(
      "No bookmarks yet. Find a nice recipe and bookmark it :)"
    );
  else bookmarksView.render(bookmarks);

  // resultsView.render(query);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    addRecipeView.renderMessage("Recipe was successfully uploaded");
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
  addRecipeView.addHandlerRender(controlAddRecipe);

  // get data from local storage
  window.addEventListener("load", controlLoad);
};

init();
