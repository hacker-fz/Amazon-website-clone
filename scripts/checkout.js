import { cart, removeCart, saveCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currency } from "./utils/money.js";

document.addEventListener('DOMContentLoaded', updateCheckoutItems);
let cartHTML = '';

cart.forEach((item) => {
  const productId = item.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) matchingProduct = product;
  });

  cartHTML += `
    <div class="cart-item-container js-cart-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${currency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: 
              <select class="js-dropdown" data-product-id="${matchingProduct.id}">
                ${[...Array(10)].map((_, i) => `
                  <option value="${i + 1}" ${item.quantity == i + 1 ? 'selected' : ''}>${i + 1}</option>
                `).join('')}
              </select>
            </span>
            <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

function updateCheckoutItems() {
  let checkoutQuantity = 0;

  cart.forEach((item) => {
    checkoutQuantity += item.quantity;
  });

  document.querySelector('.js-checkout-items').textContent = `${checkoutQuantity} Items`;
}

document.querySelector('.order-summary').innerHTML = cartHTML;

document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const dropdown = document.querySelector(`.js-dropdown[data-product-id='${productId}']`);
    const selectedQuantity = parseInt(dropdown.value);

    // Update the cart array
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity = selectedQuantity;
      saveCart()
    }

    // Update the checkout items
    updateCheckoutItems();

    // Optionally, re-render the cart item details if needed
    console.log(`Product ${productId} updated to quantity ${selectedQuantity}`);
  });
});

document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeCart(productId);
    updateCheckoutItems();

    const container = document.querySelector(`.js-cart-container-${productId}`);
    container.remove();
  });
});
