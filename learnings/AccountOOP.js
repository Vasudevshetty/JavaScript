"use strict";

class Account {
  //public fields(instances).
  // locale = navigator.language;

  // private methods
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected field.
    this.#pin = pin;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.#movements.push(-val);
    return this;
  }

  // protected field.
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log("loan approved");
    }
    return this;
  }

  getMovements() {
    return this.#movements;
  }
}

const vasu = new Account("vasu", "INR", 39);
console.log(vasu);

vasu.deposit(232);
vasu.deposit(9932);
// vasu.approveLoan();

vasu.withdraw(23);

console.log(vasu.getMovements());

// chaining
console.log(
  vasu
    .deposit(232)
    .deposit(1412)
    .requestLoan(23432)
    .withdraw(4000)
    .getMovements()
);
