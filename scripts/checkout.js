import { cart, removeCart, saveCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { currency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../data/deliveryoption.js";

function updateRenderOrder(){
  let cartHTML = '';

cart.forEach((item) => {
  const productId = item.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) matchingProduct = product;
  });


  const deliveryId = item.deliveryId
  let deliveryOption

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryId){
      deliveryOption = option
    }
  })

  const today = dayjs()
  const deliveryDate = today.add(deliveryOption.deliveryDates , 'days')
  const datestr = deliveryDate.format('dddd, MMMM D')

  cartHTML += `
    <div class="cart-item-container js-cart-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${datestr}
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
        ${deliveryHTML(matchingProduct, item)}
        </div>
      </div>
    </div>
  `;
});


function deliveryHTML(matchingProduct, item) {

  let Html =''

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs()
    const deliveryDate = today.add(deliveryOption.deliveryDates , 'days')
    const datestr = deliveryDate.format('dddd, MMMM D')

    const isChecked = deliveryOption.id === item.deliveryId

    const pricestr = deliveryOption.priceCents === 0 ? 'FREE' : `$${currency(deliveryOption.priceCents)} -`
    Html += `
    <div class="delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-id = "${deliveryOption.id}">
      <input type="radio" ${isChecked ?'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${datestr}
        </div>
        <div class="delivery-option-price">
          ${pricestr}
        </div>
      </div>
    </div>
    `
  })

  return Html
}


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


document.querySelectorAll('.delivery-option')
  .forEach((element) => {
    element.addEventListener('click' , () => {
      const {productId , deliveryId} = element.dataset
      updateDeliveryOption(productId, deliveryId)
      updateRenderOrder()
    })
  })
}

updateRenderOrder()