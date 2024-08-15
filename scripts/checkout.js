import { loadproducts } from "../data/products.js";
import { renderOrder } from "./checkout/ordersummary.js";
import { renderPayment } from "./checkout/paymentsummary.js";
// import "../data/cart-oop.js"

new Promise((resolve) => {
    loadproducts(() => {
        resolve()
    })
}).then(() => {
    renderPayment()
    renderOrder()
})

/* loadproducts(() => {
    renderPayment()
    renderOrder()
}) */
