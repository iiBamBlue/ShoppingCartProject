/* @format */

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

// This array holds the items currently in the shopping cart.
let cart = [];

// This variable tracks the total amount of cash paid by the customer.
let totalPaid = 0;

/**
 * Finds a product in the `products` array by its unique ID.
 * @param {number} productId - The unique identifier for the product.
 * @returns {object|undefined} The product object if found, otherwise undefined.
 */
function getProductById(productId) {
  return products.find((p) => p.productId === productId);
}

/**
 * Adds a product to the cart. If the product is already in the cart,
 * it increases the quantity by one.
 * @param {number} productId - The ID of the product to add.
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
 * Increases the quantity of a specific product in the cart by one.
 * @param {number} productId - The ID of the product to increase.
 */
function increaseQuantity(productId) {
  const product = getProductById(productId);
  if (product) {
    product.quantity++;
  }
}

/**
 * Decreases the quantity of a product in the cart. If the quantity
 * reaches zero, the product is removed from the cart.
 * @param {number} productId - The ID of the product to decrease.
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
 * Removes a product entirely from the cart, regardless of its quantity,
 * and resets its quantity to zero.
 * @param {number} productId - The ID of the product to remove.
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
 * Calculates the total cost of all items currently in the cart.
 * @returns {number} The total cost.
 */
function cartTotal() {
  return cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

/**
 * Empties the cart of all items and resets the quantity
 * for all products to zero.
 */
function emptyCart() {
  products.forEach((product) => {
    product.quantity = 0;
  });
  cart.length = 0;
}

/**
 * Processes a payment from the customer.
 * @param {number} amount - The amount of cash received from the customer.
 * @returns {number} The difference between the amount paid and the cart total.
 */
function pay(amount) {
  totalPaid += amount;
  const total = cartTotal();
  const difference = totalPaid - total;

  if (difference >= 0) {
    // Reset the total paid for the next transaction.
    totalPaid = 0;
    // Empty the cart since the items have been purchased.
    emptyCart();
  }

  return difference;
}

// This is a helper function for the tests.
function resetState() {
  emptyCart();
  totalPaid = 0;
}

/* The following is for running unit tests. */
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
  resetState,
  getProductById,
};
