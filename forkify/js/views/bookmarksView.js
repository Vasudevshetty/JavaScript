import PreviewView from "./PreviewView";
import View from "./View";

class BookmarksView extends View {
  parentElement = document.querySelector(".bookmarks__list");
  errorMessage = "No bookmarks yet find a nice recipe and bookmark it;)";
  message = "";

  _generateMarkup() {
    return this.data.reduce(
      (accumulator, recipe) => accumulator + PreviewView.render(recipe, false),
      ""
    );
  }
}

export default new BookmarksView();
