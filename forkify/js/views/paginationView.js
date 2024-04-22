import icons from "../../img/icons.svg";
import View from "./View";

class PaginationView extends View {
  parentElement = document.querySelector(".pagination");

  addHandlerRender(handler) {
    this.parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const page = +btn.dataset.goto;
      handler(page);
    });
  }

  _generateMarkup() {
    // page 1 only no display
    const currPage = this.data.page;
    const pageNo = Math.ceil(
      this.data.recipes.length / this.data.resultsPerPage
    );

    // page no 1 not the only page
    if (currPage === 1 && pageNo > 1)
      return this.#generateButtonMarkup("right", currPage);

    // page last, not the only page
    if (currPage === pageNo && pageNo > 1)
      return this.#generateButtonMarkup("left", currPage);

    // normal pages
    if (currPage < pageNo)
      return this.#generateButtonMarkup("left", currPage).concat(
        this.#generateButtonMarkup("right", currPage)
      );

    return "";
  }

  #generateButtonMarkup(button, currPage) {
    const page = button === "left" ? currPage - 1 : currPage + 1;
    return `
        <button class="btn--inline pagination__btn--${
          button === "left" ? "prev" : "next"
        }" data-goto="${page}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${button}"></use>
            </svg>
            <span>Page ${page}</span>
        </button>`;
  }
}

export default new PaginationView();
