// event loop in practivce.
console.log("Test starts");
setTimeout(() => {
  console.log("Message from timer");
}, 0);
Promise.resolve("Promise 1").then((res) => console.log(res));
Promise.resolve("Promise 2").then((res) => {
  for (let i = 0; i < 1000000000; i++);
  console.log(res);
});
console.log("Test ends");

// simple lottery example. for building promises from scratch
const lotteryPromise = new Promise(function (resolve, reject) {
  // make it ascyn by adding 2s delay using timer
  console.log("Lottery draw is happening 🔮");
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve("Won 🥳");
    else reject(new Error("Lost 🥲"));
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err.message));
