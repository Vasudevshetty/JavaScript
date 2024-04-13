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
  // set firstName(name) {
  //   if (name.includes(" ")) this._firstName = name;
  //   else console.log("Name doesnt contians space ");
  // }

  // get firstName() {
  //   return this._firstName;
  // }

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

// inheritance of classes,
// 1. Constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(
    `Hello, Myself ${
      this.firstName
    } and i am ${this.calcAge()} years old, studying ${this.course}.`
  );
};

const mike = new Student("mike", 2004, "Computer Science");

console.log(mike.calcAge());
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
mike.introduce();

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(mike instanceof Student, mike instanceof Person);

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log(`The charge of the car is ${this.charge}%.`);
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;

  console.log(
    `${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}%.`
  );
};

const evCar = new EV("Tesla", 120, 23);
evCar.accelerate();
evCar.brake();
evCar.chargeBattery(90);

// using es6 classes
class StudentClass extends PersonClass {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(
      `Hello, myself ${
        this.firstName
      }, and i am ${this.calcAge()} years old, studing ${this.course}.`
    );
  }
}

const marth = new StudentClass("marth", 1995, "EC");
marth.introduce();

// using Object.create

const StudentProto = Object.create(personProto);
StudentProto.init = function (firstName, birthYear, course) {
  personProto.init.call(this, firstName, birthYear);
  this.course = course;
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "EE");

jay.calcAge();

///////////////////////////////////////
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class EVCL extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log("speed is", this.speed, "charge is ", this.#charge);
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log("charge is ", this.#charge);
    return this;
  }

  brake() {
    this.speed -= 10;
    console.log("speed is", this.speed);
    return this;
  }
}

const rc = new EVCL("Rivian", 120, 23);

rc.accelerate()
  .brake()
  .accelerate()
  .chargeBattery(30)
  .accelerate()
  .accelerate()
  .brake();

console.log(rc.speedUS);
