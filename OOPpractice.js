"use strict";

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

    this.calcAge() = function () {
        
    }
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
