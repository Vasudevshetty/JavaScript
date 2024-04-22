import icons from "../../img/icons.svg";
import View from "./View";

class ResultsView extends View {
  parentElement = document.querySelector(".results");
  errorMessage = "No recipes found for your query ;)";
  message = '';

  _generateMarkup() {
    return this.data.reduce(
      (accumulator, recipe) =>
        accumulator +
        `
        <li class="preview">
            <a
              href="#${recipe.id}"
              class="preview__link"
            >
              <figure class="preview__fig">
                <img src="${recipe.imageURL}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
        `,
      ""
    );
  }
}

export default new ResultsView();
