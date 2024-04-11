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

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed = 0) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const car1 = new Car("BMW", 120);
const car2 = new Car("Mercedes", 95);

car1.accelerate();
car1.brake();

car2.accelerate();
car2.brake();

// ES6 classes
// more modern way of doing old shit.

class PersonClass {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    return 2024 - this.birthYear;
  }

  get age() {
    return 2024 - this.birthYear;
  }

  // say we want to set the properties.
  set firstName(name) {
    if (name.includes(" ")) this._firstName = name;
    else console.log("Name doesnt contians space ");
  }

  get firstName() {
    return this._firstName;
  }

  static hey() {
    console.log("hello");
  }
}

const vars = new PersonClass("vars fklasdj", 2004);

console.log(vars.calcAge());
console.log(vars.firstName);
console.log(vars);

PersonClass.hey();

// object.create method.
const personProto = {
  calcAge() {
    console.log(2024 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const dhan = Object.create(personProto);
dhan.init("dhany", 2004);
dhan.calcAge();
console.log(dhan);

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed = 0) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedUS) {
    speedUS *= 1.6;
    this.speed = speedUS;
  }
}

const car = new CarCl("BMW", 120);
car.accelerate();
car.brake();
console.log(car.speedUS);
car.speedUS = 50;
console.log(car.speed);
