import { Fraction } from "fractional";
import icons from "../../img/icons.svg";

class RecipeView {
  #data;
  #parentElement = document.querySelector(".recipe");

  render(data) {
    this.#data = data;
    this.#clear();
    const html = this.#generateMarkup();
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateMarkup() {
    return `
    <div class="recipe">
        <figure class="recipe__fig">
          <img src="${
            this.#data.image
          }" alt="recipe image" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this.#data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this.#data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>

          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data-people">4</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increse-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increse-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg>
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
           ${this.#generateIngredients()}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this.#data.publisher
            }</span>. Please
            check out the directions at their website
          </p>
          <a
            href="${this.#data.sourceUrl}"
            class="btn--small recipe__btn"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div> 
      </div>`;
    console.log(html);
  }

  #generateIngredients() {
    return `
          ${this.#data.ingredients.reduce(
            (accumulator, ingredient) =>
              accumulator +
              `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${new Fraction(
                ingredient.quantity ?? 1  
              )}</div>
              <div class="recipe__description">
              <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            </li>`,
            ""
          )}
        `;
  }

  #generateMessage() {
    return `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>Start by searching for a recipe or an ingredient. Have fun!</p>
        </div>`;
  }
  #generateError() {
    return ` 
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>No recipes found for your query. Please try again!</p>
        </div>`;
  }

  renderSpinner() {
    const spin = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", spin);
  }
}

// only one recipe view must be there singleton classes.
export default new RecipeView();
