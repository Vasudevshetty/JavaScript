import View from "./View";
import icons from "../../img/icons.svg";

class PreviewView extends View {
  _generateMarkup() {
    const id = location.hash.slice(1);
    return `
        <li class="preview">
            <a href="#${this.data.id}" class="preview__link ${
      id === this.data.id ? "preview__link--active" : ""
    }">
            <figure class="preview__fig">
                <img src="${this.data.image}" alt="Test" /> 
            </figure>
            
            <div class="preview__data">
                <h4 class="preview__title">${this.data.title}</h4>
                <p class="preview__publisher">${this.data.publisher}</p>
                <div class="preview__user-generated ${
                  this.data.key ? "" : "hidden"
                }">
                  <svg class="nav__icon">
                      <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
            </div>
            </a>
        </li> 
        `;
  }
}

export default new PreviewView();
