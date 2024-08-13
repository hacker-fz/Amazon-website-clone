import * as cartModule from "../data/cart.js";
import { products, loadproducts } from "../data/products.js";
// import { currency } from "./utils/money.js";


loadproducts(renderProducts);

function renderProducts(){
  document.addEventListener('DOMContentLoaded', updateCart);
  let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src= ${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src='${product.getStarUrl()}'>
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getpriceCents()}
          </div>

          <div class="product-quantity-container">
            <select class ="js-dropdown" data-product-id="${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

document.querySelector('.js-product-grid').innerHTML = productsHTML



function updateCart(){
  let cartQuantity = 0

      cartModule.cart.forEach((item) => {
        cartQuantity += item.quantity
      })

      document.querySelector('.cart-quantity').textContent = cartQuantity
}


document.querySelectorAll('.add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId

      cartModule.addtoCart(productId)
      updateCart()
    })
  })
}




