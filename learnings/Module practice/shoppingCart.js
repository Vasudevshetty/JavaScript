console.log('exporting module');

const shippingCost = 10;
const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };

// const totalPrice = 237;
// const totalQuantity = 23;

// export { totalPrice as price, totalQuantity };

// say we want to export somethign default
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

export { cart };

const shippingCart = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  const orderStock = function (product, quantiy) {
    console.log(`${quantiy}, ${product} ordered from the supplier`);
  };

  return {
    cart,
    shippingCost,
    totalPrice,
    totalQuantity,
    addToCart,
  };
  // this is a nice anoalogy to link how closures work 
})();

export { shippingCart };
