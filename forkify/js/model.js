import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON, setLocalStorage } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    recipes: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      bookmarked: false,
    };
    setLocalStorage("recipe", recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.query = query;
    state.search.page = 1;
    state.search.recipes = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    setLocalStorage("query", state.search);
  } catch (err) {
    throw err;
  }
};

export const getPageResults = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage,
    end = page * state.search.resultsPerPage;
  return state.search.recipes.slice(start, end);
};

export const updateServings = function (newServings = state.recipe.servings) {
  state.recipe.ingredients.forEach((ingredient) => {
    // newQT = oldQT * newServings / oldServings
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === location.hash.slice(1)) state.recipe.bookmarked = true;
  setLocalStorage("bookmarks", state.bookmarks);
};

export const removeBookmark = function (id) {
  let index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (location.hash.slice(1) === id) state.recipe.bookmarked = false;
  persistBookmark("bookmarks", state.bookmarks);
};
