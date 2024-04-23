import PreviewView from "./PreviewView";
import View from "./View";

class ResultsView extends View {
  parentElement = document.querySelector(".results");
  errorMessage = "No recipes found for your query ;)";
  message = "";

  _generateMarkup() {
    return this.data.reduce(
      (accumulator, recipe) => accumulator + PreviewView.render(recipe, false),
      ""
    );
  }
}

export default new ResultsView();
