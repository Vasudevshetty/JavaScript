"use strict";

const lufthansa = {
  name: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name: `${name}`});
  },
};

lufthansa.book(1234, "Vasu");
lufthansa.book(4321, "Visu");
console.log(lufthansa);

const eurowings = {
    name: "Eurowings",
    iataCode: "EU",
    bookings: [],
};

const booker = lufthansa.book;

booker.call(eurowings, 3426, "Varsha");
booker.call(eurowings, 6231, "Dhanya");
console.log(eurowings);


booker.apply(eurowings, [3423, "visu"]);
console.log(eurowings);


