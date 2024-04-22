import * as model from "./model";
import recipeView from "./views/recipeView";

import "core-js/stable";
import "regenerator-runtime/runtime";
// https://forkify-api.herokuapp.com/v2
// const apiKey = 'f7a3d268-c61c-4e07-a21a-b9db9a02f771';

const show = async function () {
  try {
    const id = window.location.hash.slice(1) ?? "";
    // if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch {}
};

["load", "hashchange"].forEach((ev) => window.addEventListener(ev, show));

// show();

const renderSearch = function () {};
