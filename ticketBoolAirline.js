"use strict";

const lufthansa = {
  name: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.name} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({
      flight: `${this.iataCode}${flightNum}`,
      name: `${name}`,
    });
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

// bind method.

const bookEW = booker.bind(eurowings);
const bookEW23 = booker.bind(eurowings, 23);

bookEW(32, "vasu");
bookEW23("vasu");

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.plane++;
  console.log(this.planes);
};

// this is how we can handle the listeners for objects, since it points to the queryselected object instead of the obj being called.
// document.querySelector('.buy').addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// parital applciatoin.
const addTAX = (rate, value) => value + value * rate;
console.log(addTAX(0.1, 200));

const addTAXVAT = addTAX.bind(null, 0.23);

console.log(addTAXVAT(200));

// using fucntion returning function.
const addTax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

console.log(addTax(0.23)(200));
