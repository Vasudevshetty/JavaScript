"use strict";

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // this is bad practice
  // this.calcAge() = function () {

  // }
};

// new procedure
/*
1. creates a new {] 
2. this keyword is => new {}
3. {} object is linked to a prototype
4. function(construtor function) returns the automatically created object.
*/

const vasu = new Person("vasu", 2004);
const visu = new Person("visu", 2005);

console.log(vasu, visu);
console.log(vasu instanceof Person);

// instead create fnction this way using prototype which itself a propert
// this is a prototypal inheritance, it avoids rewriting the calcAge function for every instance.
Person.prototype.calcAge = function () {
  return 2024 - this.birthYear;
};

console.log(Person.prototype);

console.log(vasu.calcAge());

console.log(vasu.__proto__);
console.log(vasu.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(vasu));
console.log(Person.prototype.isPrototypeOf(Person));

// prototype can even contain properties not just methods.
Person.prototype.species = "Homo Sapiens";

console.log(vasu, visu);

console.log(vasu.hasOwnProperty("species"));
console.log(vasu.hasOwnProperty("firstName"));

// Person.prototype
console.log(vasu.__proto__);
// Object.prtotype
console.log(vasu.__proto__.__proto__);

// null
console.log(vasu.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

// Arrays
const arr = [1, 2, 3, 4, 3, 4, 5];
console.log(arr.__proto__.constructor);

/* it's just a fun experiment, shouldn't prefer doing this. */
// to make it intersting, lets create a property that all the arrays get
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

// check the prototypal level of few of the elements of the DOM, it would be really fun