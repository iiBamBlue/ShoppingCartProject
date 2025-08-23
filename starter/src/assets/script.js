/** @format */

// Create an array named products which you will use to add all of your product object literals that you create in the next step.
const products = [
  {
    name: "Cherry",
    price: 2,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg",
  },
  {
    name: "Orange",
    price: 1.5,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg",
  },
  {
    name: "Strawberry",
    price: 3,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg",
  },
];

// Declare an empty array named cart to hold the items in the cart
let cart = [];

// This variable tracks the total amount of cash paid by the customer.
let totalPaid = 0;

/**
 * Finds a product in the `products` array by its unique ID.
 */
function getProductById(productId) {
  return products.find((p) => p.productId === productId);
}

/**
 * Adds a product to the cart or increases its quantity.
 */
function addProductToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  product.quantity++;
  if (!cart.includes(product)) {
    cart.push(product);
  }
}

/**
 * Increases the quantity of a product in the cart.
 */
function increaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity++;
  }
}

/**
 * Decreases the quantity of a product in the cart.
 */
function decreaseQuantity(productId) {
  const product = getProductById(productId);
  if (product && product.quantity > 0) {
    product.quantity--;
    if (product.quantity === 0) {
      const index = cart.findIndex((item) => item.productId === productId);
      if (index > -1) {
        cart.splice(index, 1);
      }
    }
  }
}

/**
 * Removes a product entirely from the cart.
 */
function removeProductFromCart(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity = 0;
    const index = cart.findIndex((item) => item.productId === productId);
    if (index > -1) {
      cart.splice(index, 1);
    }
  }
}

/**
 * Calculates the total cost of all items in the cart.
 */
function cartTotal() {
  return cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

/**
 * Empties the cart of all items.
 */
function emptyCart() {
  products.forEach((product) => {
    product.quantity = 0;
  });
  cart.length = 0;
}

/**
 * Processes a payment from the customer.
 */
function pay(amount) {
  totalPaid += amount;
  const total = cartTotal();
  const difference = totalPaid - total;
  if (difference >= 0) {
    totalPaid = 0;
    emptyCart();
  }
  return difference;
}

/*
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
};
*/
