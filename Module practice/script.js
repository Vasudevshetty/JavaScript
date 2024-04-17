// import './shoppingCart.js';
// import { addToCart } from './shoppingCart.js';
// import { price, totalQuantity as quantity } from './shoppingCart.js';
// console.log('importing module');

// addToCart('bread', 5);
// console.log(price, quantity);

// // say we want to export everything from a module.
// import * as everything from './shoppingCart.js';

// console.log(everything);

// import add, { shippingCart } from './shoppingCart.js';

// add('bread', 4);
// add('french fries', 8);
// add('pizaa', 7);

// import { cart } from './shoppingCart.js';

//bassically we are getijng kind of reference..... since we add from this file, we are making it reflect.
// they are sort of live connection.....
// console.log(cart);

// console.log('starting');
// // now we can use await at top level only in modules thoooo
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();

// console.log(data);
// console.log('finsihed'); // got stopped by execution

// more real world example.
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const post = getLastPost();
// we wanted an IIFE for this later.
// but now top level await does our job for in modules
const post = await getLastPost();
console.log(post);

// the common module pattern that is folllwed....

import { shippingCart } from './shoppingCart.js';
console.log(shippingCart);

console.log(shippingCart.shippingCost);
