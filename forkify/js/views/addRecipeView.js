import View from "./View";

class AddRecipeView extends View {
  parentElement = document.querySelector(".upload");
  #open = document.querySelector(".nav__btn--add-recipe");
  #modalWindow = document.querySelector(".add-recipe-window");
  #overlay = document.querySelector(".overlay");
  #close = document.querySelector(".btn--close-modal");
  #submit = document.querySelector(".upload__btn");

  addHandlerRender(handler) {
    this.parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const formDataArr = [...new FormData(this.parentElement)];
      const formData = Object.fromEntries(formDataArr);
      handler(formData);
    });
  }

  constructor() {
    super();
    this.addHandlerShowModal();
  }

  toggleWindow() {
    this.#modalWindow.classList.toggle("hidden");
    this.#overlay.classList.toggle("hidden");
  }

  addHandlerShowModal() {
    this.#open.addEventListener("click", this.toggleWindow.bind(this));
    this.#close.addEventListener("click", this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
