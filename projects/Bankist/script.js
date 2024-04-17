"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2023-11-18T21:31:17.178Z",
    "2023-12-23T07:42:02.383Z",
    "2024-01-28T09:15:04.904Z",
    "2024-04-01T10:17:24.185Z",
    "2023-05-08T14:11:59.604Z",
    "2023-05-27T17:01:17.194Z",
    "2023-07-11T23:36:17.929Z",
    "2023-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Vasudev D M",
  movements: [3000, 8800, -950, -790, -1210, -10000, 88500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2023-11-01T13:15:33.035Z",
    "2023-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2024-01-25T14:18:46.235Z",
    "2024-02-05T16:33:06.386Z",
    "2023-04-10T14:43:26.374Z",
    "2023-06-25T18:49:59.371Z",
    "2023-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "en-IN",
};

const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const formatCurrency = function (account, amount) {
  return Intl.NumberFormat(account.locale, {
    style: "currency",
    currency: account.currency,
  }).format(amount);
};
/////////////////////////////////////////////////

const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (day1, day2) =>
    Math.round(Math.abs(day2 - day1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return Intl.DateTimeFormat(locale).format(date);
};

const displayMovements = function (account, sort = false) {
  containerMovements.textContent = "";

  const movements = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movements.forEach(function (movement, index) {
    const date = new Date(account.movementsDates.at(index));
    const displayDate = formatMovementsDate(date, account.locale);

    const formatedMovement = formatCurrency(account, movement);

    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formatedMovement}</div>
        </div> 
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserName = function (accounts) {
  accounts.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((user) => user[0])
      .join("");
  });
};

const calcPrintBalance = function (account) {
  account.balance = +account.movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = formatCurrency(account, account.balance);
};

const calcDisplaySummary = function (account) {
  labelSumIn.textContent = formatCurrency(
    account,
    account.movements
      .filter((mov) => mov > 0)
      .reduce((acc, curr) => acc + curr, 0)
  );

  labelSumOut.textContent = formatCurrency(
    account,
    Math.abs(
      account.movements
        .filter((mov) => mov < 0)
        .reduce((acc, curr) => acc + curr, 0)
    )
  );
  labelSumInterest.textContent = formatCurrency(
    account,
    account.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * account.interestRate) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, cur) => acc + cur, 0)
  );
};

createUserName(accounts);

const updateUI = function (account) {
  // Display movements
  displayMovements(account);

  // Display balance
  calcPrintBalance(account);

  // Display summary
  calcDisplaySummary(account);
};

let currentAcc, timer;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAcc = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };

  labelDate.textContent = Intl.DateTimeFormat(
    currentAcc.locale,
    options
  ).format(now);

  if (currentAcc?.pin === +inputLoginPin.value) {
    // Display ui and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAcc.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // set username and pin blank
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAcc);

    if (timer) clearInterval(timer);
    timer = setLogoutTimer();
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;

  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAcc.balance &&
    receiverAcc?.userName !== currentAcc.userName
  ) {
    currentAcc.movements.push(-amount);
    currentAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAcc);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    if (timer) clearInterval(timer);
    timer = setLogoutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAcc.movements.some((mov) => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAcc.movements.push(amount);
      currentAcc.movementsDates.push(new Date().toISOString());
      updateUI(currentAcc);
    }, 2500);

    if (timer) clearInterval(timer);
    timer = setLogoutTimer();
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcc.userName &&
    currentAcc.pin === +inputClosePin.value
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAcc.userName
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
});

const setLogoutTimer = function () {
  let time = 300;
  const tick = function () {
    let min = `${Math.floor(time / 60)}`.padStart(2, 0);
    let sec = `${time % 60}`.padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Login to get Started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
