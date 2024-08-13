import { loadproducts } from "../data/products.js";
import { renderOrder } from "./checkout/ordersummary.js";
import { renderPayment } from "./checkout/paymentsummary.js";
// import "../data/cart-oop.js"

loadproducts(() => {
    renderPayment()
    renderOrder()
})
