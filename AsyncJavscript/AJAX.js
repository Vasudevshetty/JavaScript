"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// AJAX calls

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  // this is doen throghu asynchornousw way.
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(request.responseText);

    // render the country card
    renderCountryCard(data);

    // get neighbours
    const [neighbour] = data.borders;

    if (!neighbour) return;
    // neighbour.forEach((n) => {
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
    // this is doen throghu asynchornousw way.
    request2.send();

    request2.addEventListener("load", function () {
      const [data] = JSON.parse(request2.responseText);

      // render the country card
      renderCountryCard(data, "neighbour");
    });
    // });
  });
};

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
  countriesContainer.style.opacity = 100;
};

getCountryAndNeighbour("india");
