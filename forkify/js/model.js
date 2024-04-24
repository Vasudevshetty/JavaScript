import { API_KEY, API_URL, RES_PER_PAGE } from "./config";
import { AJAX, setLocalStorage } from "./helpers";

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

const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);
    setLocalStorage("recipe", recipe);
    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const searchResults = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}`);
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
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  setLocalStorage("bookmarks", state.bookmarks);
};

export const removeBookmark = function (id) {
  let index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.bookmarked = false;
  setLocalStorage("bookmarks", state.bookmarks);
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] != "")
      .map((ing) => {
        const ingArr = ing[1].replaceAll(" ", "").split(",");

        if (ingArr.length != 3)
          throw new Error(
            "Wrong ingredient fomat, please use the correct format."
          );

        const [quantity, unit, description] = ingArr;
        return { quantity: +quantity ?? null, unit, description };
      });
    const recipeToServer = {
      title: newRecipe.title,
      publisher: newRecipe.publisher,
      source_url: newRecipe.source_url,
      image_url: newRecipe.image_url,
      servings: newRecipe.servings,
      cooking_time: newRecipe.cooking_time,
      ingredients,
    };

    const serverData = await AJAX(
      `${API_URL}?key=${API_KEY}`,
      recipeToServer
    );
    const { recipe } = serverData.data;
    state.recipe = createRecipeObject(recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
