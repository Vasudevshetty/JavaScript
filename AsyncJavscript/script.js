"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};
// using es6 fetch and promises
const renderCountryCard = function (data, className = "") {
  // Get the first language code from the languages object
  const languageCode = Object.keys(data.languages)[0];
  // Get the first currency code from the currencies object
  const currencyCode = Object.keys(data.currencies)[0];

  // Get the language using the language code
  const language = data.languages[languageCode];
  // Get the currency details using the currency code
  const currency = data.currencies[currencyCode];

  // Create the HTML template
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>🧑‍🤝‍🧑</span>${(
              data.population / 1000000
            ).toFixed(1)}M</p>
            <p class="country__row"><span>🗣️</span>${language}</p>
            <p class="country__row"><span>💰</span>${currency.symbol} ${
    currency.name
  }</p>
          </div>
        </article>`;

  // Insert the HTML into the container
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const getJSON = function (url, error = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(error);
    return response.json();
  });
};

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Country not found. (${response.status})`);
      //   (err) => alert(err) bit annoying to add it everywhere
      return response.json();
    })
    .then((data) => {
      renderCountryCard(data[0]);
      const [neighbour] = data[0].borders;

      if (!neighbour) return;

      // must be returned, else we will get back to callback hell thing again.
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => renderCountryCard(data[0], "neighbour"))
    .catch((err) => {
      console.error(err + "🔥🔥🔥");
      renderError(
        `Couldnt collect data, ran into some err ${err.message} 🔥🔥🔥`
      );
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
*/

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then((data) => {
      renderCountryCard(data[0]);

      const neighbour = data[0].borders;

      if (!neighbour) throw new Error("Neighbour not found.");

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then((data) => renderCountryCard(data[0], "neighbour"))
    .catch((err) => {
      console.log(err);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener("click", function () {
  getCountryData("africa");
});
