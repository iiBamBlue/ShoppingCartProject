/** @format */

let currencySymbol = "$";
let paymentCompleted = false;

function drawProducts() {
  let productList = document.querySelector(".products");
  let productItems = "";
  products.forEach((element) => {
    productItems += `
            <div data-product-id='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>price: ${currencySymbol}${element.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
  });
  productList.innerHTML = productItems;
}

function displayCart() {
  const cartDisplay = document.querySelector(".cart");
  if (cart.length === 0) {
    cartDisplay.innerHTML = "<p>Your cart is empty</p>";
    return;
  }
  let html = "";
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    html += `
      <div data-product-id='${item.productId}'>
        <p>${item.name} - ${currencySymbol}${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ${currencySymbol}${itemTotal.toFixed(2)}</p>
        <button class="qup">+</button>
        <button class="qdown">-</button>
        <button class="remove">Remove</button>
      </div>
    `;
  });
  cartDisplay.innerHTML = html;
}

function drawCheckout() {
  let checkout = document.querySelector(".cart-total");
  checkout.innerHTML = "";
  let cartSum = cartTotal();
  let div = document.createElement("div");
  div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum.toFixed(2)}`;
  checkout.append(div);
}

drawProducts();
displayCart();
drawCheckout();

document.querySelector(".products-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productElement = e.target.closest("[data-product-id]");
    if (productElement) {
      const productId = parseInt(
        productElement.getAttribute("data-product-id")
      );
      if (paymentCompleted) {
        const receiptDisplay = document.querySelector(".pay-summary");
        if (receiptDisplay) {
          receiptDisplay.innerHTML = "";
        }
        paymentCompleted = false;
      }
      addProductToCart(productId);
      displayCart();
      drawCheckout();
    }
  }
});

document.querySelector(".cart").addEventListener("click", (e) => {
  if (!e.target.closest("[data-product-id]")) return;
  const productId = parseInt(
    e.target.closest("[data-product-id]").getAttribute("data-product-id")
  );
  if (e.target.classList.contains("remove")) {
    removeProductFromCart(productId);
  } else if (e.target.classList.contains("qup")) {
    increaseQuantity(productId);
  } else if (e.target.classList.contains("qdown")) {
    decreaseQuantity(productId);
  }
  displayCart();
  drawCheckout();
});

document.querySelector(".pay").addEventListener("click", (e) => {
  e.preventDefault();
  let amount = parseFloat(document.querySelector(".received").value) || 0;
  let cashReturn = pay(amount);
  let paymentSummary = document.querySelector(".pay-summary");
  paymentSummary.innerHTML = "";
  let div = document.createElement("div");

  if (cashReturn >= 0) {
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn.toFixed(2)}</p>
            <p>Thank you!</p>
        `;
    paymentCompleted = true;
  } else {
    div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Remaining Balance: ${currencySymbol}${-cashReturn.toFixed(2)}</p>
            <p>Please pay additional amount.</p>
        `;
  }
  document.querySelector(".received").value = "";
  paymentSummary.append(div);
  displayCart();
  drawCheckout();
});

function createEmptyCartButton() {
  const buttonContainer = document.querySelector(".empty-btn");
  if (buttonContainer) {
    const emptyButton = document.createElement("button");
    emptyButton.classList.add("empty");
    emptyButton.innerText = "Empty Cart";
    buttonContainer.append(emptyButton);
  }
}
createEmptyCartButton();

document.querySelector(".empty-btn").addEventListener("click", (e) => {
  if (e.target.classList.contains("empty")) {
    emptyCart();
    displayCart();
    drawCheckout();
  }
});
