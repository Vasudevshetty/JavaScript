"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.distance = distance; // in km
    this.duration = duration; // in min
    this.coords = coords; // [lat, lng]
  }

  _setDescription() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(
      1
    )} on ${months.at(this.date.getMonth())} ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = (this.duration / this.distance).toFixed(2);
    return this.pace;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = (this.distance / (this.duration / 60)).toFixed(2);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #mapZoomLevel = 13;
  #workouts = [];

  constructor() {
    this._getPosition();
    inputType.addEventListener("change", this._toggleElevationField.bind(this));
    form.addEventListener("submit", this._newWorkout.bind(this));
    containerWorkouts.addEventListener("click", this._moveToPopUp.bind(this));
  }

  _getPosition() {
    // get cordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your location.📍");
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, this.#mapZoomLevel);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this._showForm.bind(this));
  }

  _clearInputFields() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _hideForm() {
    this._clearInputFields();
    form.style.display = "none";
    setTimeout(() => (form.style.display = "grid"), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest("div").classList.toggle("form__row--hidden");
    inputCadence.closest("div").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    const validInput = (...inputs) =>
      inputs.every((input) => Number.isFinite(input));
    const positiveInput = (...inputs) => inputs.every((input) => input > 0);

    // clear all the input fields.

    const { lat, lng } = this.#mapEvent.latlng;
    const coords = [lat, lng];

    // get data;
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    let workout;

    // check whether the workout is cyling of running
    if (type === "running") {
      const cadence = +inputCadence.value;
      if (
        !validInput(distance, duration, cadence) ||
        !positiveInput(distance, duration, cadence)
      )
        return alert("Input positive and valid numbers only!");

      workout = new Running(coords, distance, duration, cadence);

      this._clearInputFields();
    }
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validInput(distance, duration, elevation) ||
        !positiveInput(distance, duration)
      )
        return alert("Input positive and valid numbers only!");

      workout = new Cycling(coords, distance, duration, elevation);

      this._clearInputFields();
    }

    this.#workouts.push(workout);

    // render
    this.renderSidebar(workout);
    this.renderMarker(workout);

    this._hideForm();
  }

  renderSidebar(workout) {
    const createWorkoutHTML = function (workout) {
      return `<li class="workout workout--${
        workout.type === "running" ? "running" : "cycling"
      }" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">
                 ${workout.type === "running" ? "🏃" : "🚴"}
            </span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${
              workout.type === "running" ? workout.pace : workout.speed
            }</span>
            <span class="workout__unit">${
              workout.type === "running" ? "min / km" : "km / h"
            }</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === "running" ? "🦶🏼" : "🗻"
            }</span>
            <span class="workout__value">${
              workout.type === "running"
                ? workout.cadence
                : workout.elevationGain
            }</span>
            <span class="workout__unit">${
              workout.type === "running" ? "spm" : "m"
            }
            </span>
          </div>
        </li>`;
    };
    const workoutHTML = createWorkoutHTML(workout);
    form.insertAdjacentHTML("afterend", workoutHTML);
  }

  renderMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.description} ${workout.type === "running" ? "🏃" : "🚴"}`
      )
      .openPopup();
  }

  _moveToPopUp(e) {
    const workoutSidebar = e.target.closest(".workout");
    const work = this.#workouts.find(
      (workout) => workout.id === workoutSidebar.dataset.id
    );
    this.#map.setView(work.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    work.click();
    console.log(work);
  }
}

const app = new App();
