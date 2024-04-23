import icons from "../../img/icons.svg";

export default class View {
  data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    const html = this._generateMarkup();

    if (!render) return html;

    this.#clear();
    this.parentElement.insertAdjacentHTML("afterbegin", html);
  }

  update(data) {
    this.data = data;
    const html = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(html);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this.parentElement.querySelectorAll("*"));

    newElements.forEach((newElement, i) => {
      const currElement = currElements[i];

      // firstchild refers to only text content in the dom element
      if (
        !newElement.isEqualNode(currElement) &&
        newElement.firstChild?.nodeValue.trim() !== ""
      ) {
        currElement.textContent = newElement.textContent;
      }

      // say if we want to change the attribute,
      if (!newElement.isEqualNode(currElement)) {
        Array.from(newElement.attributes).forEach((attr) => {
          currElement.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  #clear() {
    this.parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spin = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
    this.parentElement.innerHTML = "";
    this.parentElement.insertAdjacentHTML("afterbegin", spin);
  }

  renderMessage(message) {
    const msg = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
    this.#clear;
    this.parentElement.innerHTML = msg;
  }

  renderError(errorMessage = this.errorMessage) {
    const error = ` 
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${errorMessage}</p>
        </div>`;
    this.#clear();
    this.parentElement.innerHTML = error;
  }
}
