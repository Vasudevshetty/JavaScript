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

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log("This will never run again");
};
runOnce();

// IIFE
(function () {
  console.log("This will never run again");
  const isPrivate = 23;
})();

// console.log(isPrivate);

(() => console.log("This will ALSO never run again"))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const bookerClousre = secureBooking();

bookerClousre();
bookerClousre();
bookerClousre();

console.dir(booker);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  let vasu = "vasudev dm is a good boy";

  setTimeout(function () {
    vasu = vasu.replace("good", "bad");
    console.log(vasu);
  }, 2000);

  // the set timout function actually took the vasu varaible which was obviously not related to it by any way.
  console.log(vasu + "\nWe will see how closures gonna work on this.\n");
})();
