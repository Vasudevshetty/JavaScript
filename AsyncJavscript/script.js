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

      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error("Neighbour not found.");

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Country not found`
      );
    })
    .then((data) => renderCountryCard(data[0], "neighbour"))
    .catch((err) => {
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=354004943367642344342x79807`
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Error with reolading, ${response.status}`);

      return response.json();
    })
    .then((data) => {
      const { city, country } = data;

      countriesContainer.insertAdjacentText(
        "beforeend",
        `You are in ${city}, ${country}`
      );

      getCountryData(country);
    })
    .catch((err) => console.log(err));
};

// navigator.geolocation.getCurrentPosition(function (position) {
//   const { lat, lng } = position.coords;
// });

// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// lets promisfy geolocation
const getLocation = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => resolve(position),
    //   (error) => reject(error)
    // );

    // make it simpler
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getLocation()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

btn.addEventListener("click", function () {
  getLocation()
    .then((data) => {
      const { latitude, longitude } = data.coords;
      whereAmI(latitude, longitude);
    })
    .catch((err) => renderError(err.message));
});
