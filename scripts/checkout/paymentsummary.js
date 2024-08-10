import { cart } from "../../data/cart.js";
import { getDeliveryDetails } from "../../data/deliveryoption.js";
import { getProduct } from "../../data/products.js";
import { currency } from "../utils/money.js";



export function renderPayment(){

    let productPriceCents = 0
    let shippingPriceCents = 0

    cart.forEach((item) => {
        const product = getProduct(item.productId)
        productPriceCents += product.priceCents * item.quantity
        const deliveryDetails = getDeliveryDetails(item.deliveryId)
        shippingPriceCents += deliveryDetails.priceCents
    })

    const totalCents = productPriceCents + shippingPriceCents
    const taxCents = totalCents * 0.1
    const totalWithTax = totalCents + taxCents

    const paymentHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${currency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${currency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${currency(totalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${currency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${currency(totalWithTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `

    document.querySelector('.payment-summary').innerHTML = paymentHTML
 }
 