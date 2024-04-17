'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// lets make this immutable
const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimits = (limits, user) => limits?.[user] ?? 0;

const addExpenses = function (state, value, description, user = 'jonas') {
  // if (!user) user = 'jonas';
  // user = user.toLowerCase();
  const cleanUser = user.toLowerCase();

  // let limit = spendingLimits[user] || 0;
  // let limit = spendingLimits?.[user] ?? 0;
  // console.log(limit);

  // if (value <= getLimits(user)) {
  //   budget.push({ value: -value, description, user });
  // }

  return value <= getLimits(cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const bud1 = addExpenses(budget, 10, 'Pizza 🍕');
const bud2 = addExpenses(bud1, 100, 'Going to movies 🍿', 'Matilda');
const bud3 = addExpenses(bud2, 200, 'Stuff', 'Jay');
// console.log(budget);
// console.log(bud1, bud2, bud3);

const checkExpenses = function (state, limits) {
  return state.map(person =>
    person.value < -getLimits(limits, person)
      ? { ...person, flag: 'limit' }
      : person
  );
  // for (const el of budget) {
  //   // let lim;
  //   // if (spendingLimits[el.user]) {
  //   //   lim = spendingLimits[el.user];
  //   // } else {
  //   //   lim = 0;
  //   // }
  //   // let limit = spendingLimits[el.user] || 0;
  //   // let limit = spendingLimits?.[el.user] ?? 0;
  //   if (el.value < -getLimits(el.user)) {
  //     el.flag = 'limit';
  //   }
  // }
};
const exp = checkExpenses(budget, spendingLimits);
console.log(exp);

// console.log(budget);

const bigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   // if (el.value <= -BigLimit) {
  //   //   output += el.description.slice(-2) + ' / '; // Emojis are 2 chars
  //   // }
  //   output =
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  return (
    state
      .filter(person => person.value <= -bigLimit)
      // .map(value => value.description.slice(-2));
      .reduce(
        (output, current) => `${output}/${current.description.slice(-2)}`,
        ''
      )
  );
};

const things = bigExpenses(budget, 100).slice(1);
console.log(...things);

// bigExpenses(0);
