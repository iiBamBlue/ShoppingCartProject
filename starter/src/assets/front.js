/** @format */

let currencySymbol = "$";
let paymentCompleted = false; // This flag is needed to clear the receipt later

// Draws product list
function drawProducts() {
  let productList = document.querySelector(".products");
  let productItems = "";
  products.forEach((element) => {
    productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${element.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
  });
  productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
  let cartList = document.querySelector(".cart");
  let cartItems = "";
  if (cart.length === 0) {
    cartList.innerHTML = "Cart Empty";
    return;
  }
  cart.forEach((element) => {
    let itemTotal = element.price * element.quantity;
    cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${element.price}</p>
                <p>quantity: ${element.quantity}</p>
                <p>total: ${currencySymbol}${itemTotal.toFixed(2)}</p>
                <button class="qup">+</button>
                <button class="qdown">-</button>
                <button class="remove">remove</button>
            </div>
        `;
  });
  cartList.innerHTML = cartItems;
}

// Draws checkout
function drawCheckout() {
  let checkout = document.querySelector(".cart-total");
  checkout.innerHTML = "";
  let cartSum = cartTotal();
  let div = document.createElement("div");
  div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum.toFixed(2)}`;
  checkout.append(div);
}

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

// Use event delegation on a parent element for adding products
document.querySelector(".products-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    let productElement = e.target.closest("[data-productId]");
    if (productElement) {
      // FIX: Logic to clear receipt for a new "customer"
      if (paymentCompleted) {
        document.querySelector(".pay-summary").innerHTML = "";
        paymentCompleted = false; // Reset the flag
      }
      let productId = parseInt(productElement.getAttribute("data-productId"));
      addProductToCart(productId);
      drawCart();
      drawCheckout();
    }
  }
});

// Event delegation used to support dynamically added cart items
document.querySelector(".cart").addEventListener("click", (e) => {
  function runCartFunction(fn) {
    let productId = parseInt(
      e.target.parentNode.getAttribute("data-productId")
    );
    fn(productId);
    drawCart();
    drawCheckout();
  }

  if (e.target.classList.contains("remove")) {
    runCartFunction(removeProductFromCart);
  } else if (e.target.classList.contains("qup")) {
    runCartFunction(increaseQuantity);
  } else if (e.target.classList.contains("qdown")) {
    runCartFunction(decreaseQuantity);
  }
});

document.querySelector(".pay").addEventListener("click", (e) => {
  e.preventDefault();
  let amount = parseFloat(document.querySelector(".received").value) || 0;
  let cashReturn = pay(amount);
  let paymentSummary = document.querySelector(".pay-summary");
  paymentSummary.innerHTML = ""; // FIX: Clears the old receipt before adding a new one
  let div = document.createElement("div");

  if (cashReturn >= 0) {
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn.toFixed(2)}</p>
            <p>Thank you!</p>
        `;
    paymentCompleted = true; // Set flag to true for the next transaction
  } else {
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Remaining Balance: ${currencySymbol}${-cashReturn.toFixed(2)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
  }

  // FIX: These lines solve the remaining bugs
  document.querySelector(".received").value = ""; // Clears the input field
  paymentSummary.append(div);
  drawCart(); // Redraws the now-empty cart
  drawCheckout(); // Updates the cart total to 0
});

/* 
The following code manages the shopping cart functionality, including adding products,
updating quantities, calculating totals, and handling payments.
*/
